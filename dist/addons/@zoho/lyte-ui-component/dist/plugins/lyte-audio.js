( function() {
    var audioContext, intervalId, config, microphone, 
    inputNode, wavProcessingNode, worker, stopped, silenceTimeout, maxDurationTimeout,
    scriptProcessorNode, destinationNode;

    /* sometimes somedevices do not give you a 44100 sampling rate so we are hard coding this */
    // var SAMPLING_RATE = 44100;

    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        chunk = undefined;


    const eventTypeStop = 'stop',
    eventTypePause = 'pause',
    eventTypeChunk = 'chunk';

    $L.media = {};

    var sendBlobToUser = function( event ) {
        var blob = event.data[ 0 ],
        samples = event.data[ 1 ],
        eventType = event.data[ 2 ];

        if( eventType === eventTypeStop ) {
            if( stopped && config.onStop ) {
                config.onStop( blob, samples );
            }
    
            if( config.onEnd ) {
                config.onEnd( blob, samples );
            }
        }
        else if( eventType === eventTypePause ) {
            if( config.onPause ) {
                config.onPause( blob, samples, samples.length / config.samplingRate );
            }
        }

        

        // var a = document.createElement( 'a' );
        // a.setAttribute( 'download', 'testing' );
        // var url = window.URL.createObjectURL( blob );
        // a.setAttribute( 'href', url );
        // document.body.appendChild( a );
        // a.click();
        // a.remove();

    }

    

    $L.media.record = async function( options ) {
        config = options || {};

        try {
            var audioContextConstructor =  window.AudioContext || window.webkitAudioContext,
            basePath = config.workletBasePath || '';
    
            audioContext = new audioContextConstructor( /* { sampleRate: SAMPLING_RATE } */ );
            config.samplingRate = audioContext.sampleRate;
    
            chunk = options.chunk;
            stopOnSilence = options.stopOnSilence;
            silenceThreshold = options.silenceThreshold || 0.1;
            silenceDuration = options.silenceDuration || 3000;
            stopped = false;
    
            var maxListenDuration = options.maxListenDuration;
    
            microphone = await navigator.mediaDevices.getUserMedia( {
                audio: true
            } );
    
            registerWorker();
    
            inputNode = audioContext.createMediaStreamSource( microphone );
    
            if( isSafari ) {
                useScriptProcessorNode( inputNode.context, inputNode );
            }
            else {
                useAudioWorklet( audioContext, basePath, inputNode );
            }
    
            disableRecordingAfterMaxDuration( maxListenDuration );
        } catch( error ) {
            if( audioContext ) {
                try {
                    audioContext.close();
                } catch( e ) {
                    // Ignore close errors
                }
            }

            if( config.onError ) {
                config.onError( error );
            }

            throw error;
        }
        
    }


    function disableRecordingAfterMaxDuration( maxListenDuration ) {
        if( !isNaN( maxListenDuration ) ) {
            maxDurationTimeout = setTimeout( function() {
                $L.media.stop();
            }, maxListenDuration );
        }
    }

    function useScriptProcessorNode( context, inputNode ) {
        var bufferSize = 4096,
        inputChannel = 1,
        outputChannel = 1, 
        node = ( context.createScriptProcessor || context.createJavascriptProcessor ).call( context, bufferSize, inputChannel, outputChannel );

        inputNode.connect( node );
        node.connect( context.destination );

        scriptProcessorNode = node;
        destinationNode = context.destination;

        node.onaudioprocess = ( audioProcessingEvent ) => {
            for( var i = 0; i < inputChannel; i++ ) {
                var channelData = audioProcessingEvent.inputBuffer.getChannelData( i );

                if( config.onProgress ) {
                    config.onProgress( channelData );
                }

                worker.postMessage( { type: 'data', data: channelData, chunk: chunk } );
            }
        };
    }

    async function useAudioWorklet( audioContext, basePath, inputNode ) {
        await audioContext.audioWorklet.addModule( basePath + 'audioSampleSender.js' );

        wavProcessingNode = new AudioWorkletNode( audioContext, 'audio-sample-processor' );

        inputNode.connect( wavProcessingNode );

        wavProcessingNode.connect( audioContext.destination );

        silenceTimeout = null;

        wavProcessingNode.port.onmessage = function ( e ) {
            if( config.onProgress ) {
                config.onProgress( e.data );
            }

            if (stopOnSilence) {
                let rms = Math.sqrt(e.data.reduce((sum, value) => sum + value * value, 0) / e.data.length);
                if (rms < silenceThreshold) {
                    if (!silenceTimeout && audioContext.state == 'running') {
                        silenceTimeout = setTimeout(() => {
                            $L.media.stop();
                        }, silenceDuration);
                    }
                } else {
                    clearSilenceTimeout();
                }
            }

            worker.postMessage( { type: 'data', data: e.data, chunk: chunk } );
        }

        enableChunking();
    }

    function registerWorker() {
        var basePath = config.workerBasePath || '';

        worker = new Worker( basePath + 'wavProcessor.js' );

        worker.onmessage = sendBlobToUser;
    }

    function enableChunking() {
        var timeslice = config.timeslice;

        if( !isNaN( timeslice ) ) {
            intervalId = setInterval( function() {
                worker.postMessage( { type: 'process', eventType: eventTypeChunk } );
            }, timeslice );
        }
    }

    $L.media.pause = function() {
        
        clearTimeouts();

        if( isSafari ) {
            scriptProcessorNode.disconnect( destinationNode );
        }
        else {
            audioContext.suspend();   
        }

        
        worker.postMessage( { type: 'process', chunk: chunk, eventType: eventTypePause } );    
    }

    $L.media.resume = function() {
        /* pause, resume only works with this line. 
           Sometimes resuming(resuming after pausing it for a while) is not sending any data to audioWorkletProcessor(input is empty array)
        */ 
        
        if( isSafari ) {
            scriptProcessorNode.connect( destinationNode );
        }
        else {
            inputNode.connect( wavProcessingNode );
            enableChunking();
            audioContext.resume();  
        }          
    }

    $L.media.stop = function() {
        stopped = true;
        clearTimeouts();
        stopMediaStream();
        worker.postMessage( { type: 'process', chunk: chunk, eventType: eventTypeStop } );
    }

    function stopMediaStream() {
        var tracks = microphone.getAudioTracks();

        for( var i = 0; i < tracks.length; i++ ) {
            tracks[ i ].stop();
        }

        audioContext.close();
    }

    function clearSilenceTimeout(){
        if (silenceTimeout) {
            window.clearTimeout( silenceTimeout );
            silenceTimeout = null;
        }
    }

    function clearMaxDurationTimeout() {
        if( maxDurationTimeout ) {
            window.clearTimeout( maxDurationTimeout );
            maxDurationTimeout = null;
        }
    }

    function clearIntervalTimeout() {
        if( intervalId ) {
            window.clearInterval( intervalId );
            intervalId = null;
        }
    }

    function clearTimeouts() {
        clearSilenceTimeout();
        clearMaxDurationTimeout();
        clearIntervalTimeout();
    }

    $L.media.convertWavToMp3 = function (wavBlob) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var wavBuffer = e.target.result,
                    wav = lamejs.WavHeader.readHeader(new DataView(wavBuffer)),
                    samples = new Int16Array(wavBuffer, wav.dataOffset, wav.dataLen / 2),
                    mp3Encoder = new lamejs.Mp3Encoder(wav.channels, wav.sampleRate, 128),
                    mp3Data = [],
                    blockSize = 1152;
                    
                    for (var i = 0; i < samples.length; i += blockSize) {
                        var sampleChunk = samples.subarray(i, i + blockSize),
                        mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
                        if (mp3buf.length > 0) {
                            mp3Data.push(mp3buf);
                        }
                    }
                    
                    var end = mp3Encoder.flush();
                    if (end.length > 0) {
                        mp3Data.push(end);
                    }
                    
                    var mp3Blob = new Blob(mp3Data, { type: "audio/mp3" });
                    resolve(mp3Blob);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = function() {
                reject(new Error('Failed to read WAV blob'));
            };
            reader.readAsArrayBuffer(wavBlob);
        });
    }

} )();

