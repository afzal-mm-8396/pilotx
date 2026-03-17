; (function () {

    var recordStore = [], blockCount = 0;

    function fetchAudio(url, options, rej) {
        return fetch(url, options.fetchOptions).then(function (res) {
            return res.arrayBuffer()
        }).then(function (buff) {
            var context = new AudioContext();
            return context.decodeAudioData(buff)
        }).then(function (audio_buff) {
            return audio_buff.getChannelData(0);
            // res()
        }).catch(function (err) {
            rej(err);
            return err;
        });
    }

    function processArr(arr, expected_count) {
        var len = arr.length,
            count_ratio = expected_count / len,
            sum = 0,
            count = 0,
            overflow = 0,
            out = [];

        arr.forEach(function (item) {
            sum += item;
            count += 1;
            overflow += count_ratio;

            if (overflow > 1) {
                out.push(sum / count);
                count = sum = 0;
                overflow -= 1;
            }
        });

        if (count > 0) {
            out.push(sum / count);
        }

        return out;
    }

    function getLimit(canvas, ctx, options, vScale, length) {
        var width = options.width,
            height = options.height,
            limit = options.progressAnimation ? [(options.currentTime * length) / options.duration, length] : [length];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        canvas.width = width;
        canvas.height = height;
        ctx.scale(1, vScale);
        ctx.translate(0, (1 - vScale) * 0.5 * height / vScale);

        return limit;
    }

    function drawLineThumb(options, buffer, _length) {

        var width = options.width,
            height = options.height,
            canvas = options.canvas,
            margin = options.margin,
            min_height = options.minHeight,
            recording = options.recording,
            animation = options.progressAnimation,
            prevRecording = options.prevRecording,
            vScale = options.verticalScale,
            time = options.time || 7,
            timeOut = options.timeOut || 0,
            processData = 345 * time,//this for recording => 345 for 1sec
            sample = recording ? 1 : options.sample,
            blocks = Math.floor((_length || buffer.length) / sample),
            ctx = canvas.getContext('2d'), bufferData = [], max_hgt = 0,
            nestArr = Array.isArray(buffer[0]), curNestInd = 0,
            preNestLen = 0, curNestLen = buffer[curNestInd] && buffer[curNestInd].length;

        if (!prevRecording) {
            for (var i = 0; i < sample; i++) {
                var curMax = 0;
                for (var j = i * blocks; j < (i + 1) * blocks; j++) {

                    var curBuffer, ind = Math.floor(j);

                    if (nestArr) {
                        if (curNestLen <= ind - curNestInd * preNestLen) {
                            ++curNestInd;
                            preNestLen = curNestLen;
                            curNestLen = buffer[curNestInd].length;
                        }
                        curBuffer = buffer[curNestInd][ind - curNestInd * preNestLen];
                    } else {
                        curBuffer = buffer[ind];
                    }

                    var curHeight = Math.max(min_height / 2, Math.abs(curBuffer) * (height - 2 * margin));

                    if (max_hgt < curHeight) {
                        max_hgt = curHeight;
                    }
                    if (Math.abs(curMax) < curHeight) {
                        curMax = curBuffer
                    }
                }
                bufferData.push(curMax);

            }
        }

        if (recording) {
            if (recordStore.length >= processData) {
                recordStore.shift();
            }
            recordStore.push(bufferData[0]);
            max_hgt = 0;
            bufferData = recordStore;
            timeOut = options.timeOut || 8;
        } else if (prevRecording) {
            bufferData = recordStore;
            recording = true;
            clearTimeout(window.__times);
            delete window.__times;
        }

        if (window.__times && !prevRecording) {
            return
        }

        window.__times = setTimeout(function () {

            clearTimeout(window.__times);
            delete window.__times;

            var bufferDataLen = bufferData.length;

            // if (recording) {
            //     options.result = bufferDataLen;
            // }

            var limit = getLimit(canvas, ctx, options, vScale, width),
                done = false,
                x = 0,
                segmentSize = width / bufferDataLen;//single segment size

            if (recording) {
                segmentSize = width / processData
                x = segmentSize * (processData - bufferDataLen);
            }

            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.strokeStyle = animation ? options.overlapFillStyle : options.fillStyle;

            for (var i = 0; i < bufferDataLen; i++) {
                var y = (bufferData[i] + 1) * height / 2;

                if (i == 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += segmentSize;

                if (done) {
                    ctx.strokeStyle = options.fillStyle;
                }
                if (!done && animation && x >= limit[0]) {
                    ctx.strokeStyle = options.overlapFillStyle;
                    done = true
                    ctx.stroke();
                    ctx.beginPath();
                }
            }
            ctx.stroke();
        }, timeOut)
    }

    function drawBarThumb(options, buffer, _length) {

        var result = options.result,
            width = options.width,
            height = options.height,
            canvas = options.canvas,
            margin = options.margin,
            min_height = options.minHeight,
            recording = options.recording,
            prevRecording = options.prevRecording,
            animation = options.progressAnimation,
            vScale = options.verticalScale,
            sample = recording ? 1 : options.sample,
            time = options.time || 7,
            processData = 345 * time,
            barSpacing = options.barSpacing,
            blocks = Math.floor((_length || buffer.length) / sample),
            ctx = canvas.getContext("2d"),
            audio_array = [],
            nestArr = Array.isArray(buffer[0]), curNestInd = 0, preNestLen = 0, curNestLen = buffer[curNestInd] && buffer[curNestInd].length,
            getSamples = function (sample, blocks, buffer, arr) {
                for (var i = 0; i < sample; i++) {
                    var max = 0;

                    for (var j = i * blocks; j < (i + 1) * blocks; j++) {

                        var curBuffer;

                        if (nestArr) {
                            if (curNestLen <= j - curNestInd * preNestLen) {
                                ++curNestInd;
                                preNestLen = curNestLen;
                                curNestLen = buffer[curNestInd].length;
                            }
                            curBuffer = buffer[curNestInd][j - curNestInd * preNestLen];
                        } else {
                            curBuffer = buffer[j];
                        }

                        max = Math.max(max, Math.abs(curBuffer));

                    }

                    arr.push(max);
                }
            };

        !prevRecording && getSamples(sample, blocks, buffer, audio_array);

        var max_hgt = 0,
            segmentNeed = parseInt(processData / result),
            arr = [],
            line_width;

        if (recording) {
            line_width = width / result;
            recordStore.push(audio_array[0]);
            if (recordStore.length >= ((result + 1) * segmentNeed)) {
                recordStore.splice(0, segmentNeed);
                --blockCount;
            }
            var formableBlock = parseInt((recordStore.length) / segmentNeed);
            min = 0;
            if (formableBlock > blockCount) {
                getSamples(formableBlock, segmentNeed, recordStore, arr);
                blockCount++;
            } else {
                return;
            }
        } else if (prevRecording) {
            var formableBlock = parseInt((recordStore.length) / segmentNeed);

            line_width = width / result;
            getSamples(formableBlock, segmentNeed, recordStore.slice(0, formableBlock * segmentNeed), arr);
            prevRecording && (recording = true);
        } else {
            arr = options.averageData ? processArr(audio_array, result) : audio_array;

            arr.forEach(function (item) {
                max_hgt = Math.max(max_hgt, Math.max(min_height / 2, Math.abs(item) * (height - 2 * margin)));
            });

            line_width = width / arr.length / barSpacing;
        }

        var limit = getLimit(canvas, ctx, options, vScale, width),
            x = line_width * (result - arr.length);

        ctx.beginPath();

        recording && (line_width /= barSpacing);

        ctx.fillStyle = animation ? options.overlapFillStyle : options.fillStyle;

        for (var i = 0; i < arr.length; i++) {
            var cur_height = Math.max(min_height / 2, Math.abs(arr[i]) * (height - 2 * margin));

            if (!recording) {
                x = (line_width * i * barSpacing) + barSpacing;
            }

            if (animation && x >= limit[0] && ctx.fillStyle != options.fillStyle) {
                ctx.fillStyle = options.fillStyle;
            }

            ctx.fillRect(x, (height - cur_height) / 2, line_width, cur_height);

            if (animation && x <= limit[0] && limit[0] <= x + line_width) {
                ctx.fillStyle = options.fillStyle;
                ctx.fillRect(limit[0], (height - cur_height) / 2, x + line_width - limit[0], cur_height);
            }

            x += (line_width + (recording ? (barSpacing * line_width) - line_width : 0));
        }

    }


    function drawThumb(options, res, buffer) {
        var type = options.type,
            _length = 0, canvas;

        if (Array.isArray(buffer[0])) {
            for (var i = 0; i < buffer.length; i++) {
                _length += buffer[i].length;
            }
        }

        if (type == "bar") {
            canvas = drawBarThumb(options, buffer, _length);
        } else {
            canvas = drawLineThumb(options, buffer, _length);
        }

        res({
            canvas: canvas,
            audio_buffer: buffer
        });
    }

    _lyteUiUtils.generateThumb = function (options) {

        var canvas = options.canvas,
            copied_options = $L.extend({
                sample: 256,
                result: 64,
                width: (canvas && canvas.offsetWidth) || 100,
                height: (canvas && canvas.offsetHeight) || 200,
                margin: 20,
                minHeight: 5,
                verticalScale: 1,
                barSpacing: 2,
                averageData: true,
                type: "bar",
                fillStyle: "#333",
                fetchOptions: {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include'
                }
            }, options);

        if (options.stop) {
            recordStore = [];
            blockCount = 0;
            return;
        }

        if (options.type == 'line') {
            options.sample || (copied_options.sample = 345 * (copied_options.time || 7));
            options.verticalScale || (copied_options.verticalScale = 2);
        }


        return new Promise(function (res, rej) {

            window.audioThumbRej = rej;

            if (options.buffer) {
                drawThumb(copied_options, res, options.buffer);
            } else {
                fetchAudio(copied_options.src, copied_options, rej)
                    .then(drawThumb.bind(this, copied_options, res))
                    .catch(error => {
                        throw error
                    })
            }
        });
    };

    _lyteUiUtils.generateProgress = function (options) {
        return this.generateThumb(options);
    }

})();