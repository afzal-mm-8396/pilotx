/**
 * Renders a Chart
 * @component lyte-chart
 * @version 3.111.0
 * @utility reDrawChart
*/
Lyte.Component.register("lyte-chart", {
_template:"<template tag-name=\"lyte-chart\" lyte-chart=\"\"> <div class=\"lyteChartOutlet\"></div> </template>",
_dynamicNodes : [],
_observedAttributes :["data","ltPropMetaDataAxes","ltPropMetaDataColumns","ltPropSeriesData","ltPropType","ltPropCanvasTitle","ltPropCanvasSubtitle","ltPropCanvasBackground","ltPropCanvasBorder","ltPropCanvasIntelligence","ltPropCanvasShadow","ltPropTitleStyle","ltPropSubtitleStyle","ltPropCanvasStyle","ltPropCanvasAccessibility","ltPropCreditsEnabled","ltPropCreditsText","ltPropCreditsStyle","ltPropLoaderEnabled","ltPropLoaderText","ltPropLoaderType","ltPropLoaderStyle","ltPropNotesEnabled","ltPropNotesType","ltPropNotesBatch","ltPropNotesDataIndex","ltPropNotesStyle","ltPropBlockValuesForNotes","ltPropChartValuesForNotes","ltPropPlotValuesForNotes","ltPropNotesAnimation","ltPropNotesOptionsForStickyNote","ltPropNotesOptionsForCustomNote","ltPropLegendEnabled","ltPropLegendBackground","ltPropLegendBorder","ltPropLegendColorBox","ltPropUseChartEffectForLegend","ltPropLegendColorBand","ltPropLegendColorAxis","ltPropLegendColorPallete","ltPropLegendColors","ltPropLegendEvents","ltPropLegendExpandable","ltPropLegendFilter","ltPropLegendHighlightEffect","ltPropLegendImagePallete","ltPropLegendStyle","ltPropLegendItemDisabledStyle","ltPropLegendItemHoverStyle","ltPropLegendShadow","ltPropLegendTitle","ltPropLegendTitleStyle","ltPropLegendSelectAllBox","ltPropLegendSize","ltPropTextForNoDataHandler","ltPropNoDataHandlerStyle","ltPropTooltipEnabled","ltPropTooltipStyle","ltPropTooltipStructure","ltPropUseChartEffectForTooltip","ltPropFocusOnTooltipEvent","ltPropChartStyle","ltPropChartAxesRotated","ltPropChartBehavior","ltPropChartAnimation","ltPropChartXaxis","ltPropChartYaxis","ltPropChartEffects","ltPropChartPlot","ltPropChartPlotAnimation","ltPropChartPlotBackground","ltPropChartPlotBorder","ltPropChartPlotDatalabels","ltPropChartPlotEvents","ltPropChartPlotEventHandler","ltPropChartPlotMorph","ltPropChartPlotOptions","ltPropChartPlotRenderer","ltPropChartScroll","ltPropChartBrush","ltPropChartZoom","ltPropAxesEvents","ltPropLegendEvents","ltPropLegendActions","ltPropRedraw","ltPropEnableRedrawOnResize","methods","chartData"],
_observedAttributesType :["object","object","array","object","string","string","string","object","object","object","object","object","object","object","object","boolean","string","object","boolean","string","string","object","boolean","string","object","number","object","array","array","array","object","object","object","boolean","object","object","object","boolean","object","object","object","array","object","object","object","object","string","object","object","object","object","string","object","object","object","string","object","boolean","object","object","boolean","boolean","object","boolean","object","object","object","array","object","object","object","object","object","object","object","object","object","object","object","object","object","object","object","object","object","boolean","boolean","object","object"],

    init: function () {
        this.$node.reDrawChart = function () {
            this.component.reDraw();
        }
        this.$node.updateChart = function (property, value) {
            var oldVal = this.getData(property);
            if (oldVal !== value) {
                this.setData(property, value);
                this.component.reDraw();
            }
        }
    },
    data: function () {
        var defaultChartData = {
            "canvasBackground": { //ltPropCanvasBackground
                'alpha': 1,
                'imageRepeat': 'none',
                'gradients': {
                    'show': false
                }
            },

            "canvasBorder": { //ltPropCanvasBorder
                'color': '#666',
                'radius': 1,
                'show': true,
                'size': 1,
                'style': 'solid'
            },

            "canvasShadow": { //ltPropCanvasShadow
                'blur': 2,
                'color': 'rgba(0, 0, 0, 0.1)',
                'inset': false,
                'show': true,
                'x': 1,
                'y': 1
            },

            "titleStyle": { //ltPropTitleStyle
                'fontSize': 15,
                'fontStyle': "normal",
                'fontWeight': "normal",
                'show': true,
                'hAlign': 'left',
                'vAlign': 'top',
                'tooltip': false
            },

            "subtitleStyle": { //ltPropSubtitleStyle
                'fontSize': 13,
                'fontStyle': 'normal',
                'fontWeight': 'normal',
                'show': true,
                'tooltip': false,
                'vAlign': 'top'
            },

            "canvasStyle": { //ltPropCanvasStyle
                'fontSize': 10,
                'fontStyle': 'normal',
                'fontWeight': 'normal',
                'theme': 'defaultTheme'
            },

            "canvasAccessibility": { //ltPropCanvasAccessibility
                'enabled': false
            },

            "canvasIntelligence": { //ltPropCanvasIntelligence
                'dataCount': {
                    'animation': 300,
                    'datalabels': 300,
                    'marker': 300
                },
                'dimension': {
                    'credits': 150,
                    'marker': 50,
                    'legend': 140,
                    'subtitle': 120,
                    'title': 100,
                    'xaxis': 70,
                    'xaxislabel': 80,
                    'yaxis': 70,
                    'yaxislabel': 80
                }
            },

            "creditsStyle": {//ltPropCreditsStyle
                'fontSize': 10,
                'fontStyle': 'normal',
                'fontWeight': 'normal',
                'hAlign': 'right',
                'target': 'null',
                'marginBottom': 10,
                'marginLeft': 0,
                'marginRight': 10,
                'marginTop': 10,
                'tooltip': false,
                'vAlign': 'bottom'
            },

            //ltPropLoaderStyle
            "loaderStyle": {
                'colors': ["rgb(204, 32, 50)", "rgb(24, 153, 74)", "rgb(1, 115, 178)", "rgb(253, 208, 25)"],
                'fontSize': 10,
                'fontStyle': 'normal',
                'fontWeight': 'normal'
            },

            "legendBorder": {  //ltPropLegendBorder
                'color': 'transparent',
                'radius': 1,
                'show': true,
                'size': 1,
                'style': 'solid'
            },

            "legendColorBox": { //ltPropLegendColorBox
                'fontSize': 10,
                'shape': 'square',
                'strokeWidth': 2,
                'vAlign': 'center'
            },

            "legendColorAxis": { //ltPropLegendColorAxis
                'show': true,
                'reversed': false
            },

            "legendExpandable": { //ltPropLegendExpandable
                'show': false,
                'fontSize': 10,
                'textAlign': 'right',
                'text': "more..."
            },

            "legendFilter": { //ltPropLegendFilter
                'enabled': true,
                'slider': {
                    'type': 'lever'
                }
            },

            "legendItemDisabledStyle": { //ltPropLegendItemDisabledStyle
                'color': '#d1d1d1',
                'strikeout': false,
                'colorBox': {
                    'grayScale': false
                }
            },

            "legendItemHoverStyle": { //ltPropLegendItemHoverStyle
                'backgroundColor': 'transparent',
                'fontStyle': 'normal',
                'fontWeight': 'normal',
                'showOnDataHover': false,
                'textShadow': '1px 1px 1px grey',
                'triggerOffset': 10,
                'type': 'triangleUp'
            },

            "legendSelectAllBox": { //ltPropLegendSelectAllBox
                'show': false,
                'strokeWidth': 1,
                'fillColor': 'transparent',
                'disabledOpacity': 0.3,
                'selected': true,
                'shape': 'square'
            },

            "noDataHandlerStyle": { //ltPropNoDataHandlerStyle
                'fontSize': 10,
                'fontStyle': 'normal',
                'fontWeight': 'normal'
            },

            "chartAnimation": {//ltPropChartAnimation
                'enabled': true,
                'duration': 600
            },

            "chartXAxis": { //ltPropChartXaxis
                'splitLeaves': 'false',
                'reversed': false,
                'show': true,
                'tickOrient': 'outer',
                'label': {
                    'fontSize': 10,
                    'fontStyle': 'normal',
                    'fontWeight': 'bold',
                    'show': true,
                    'text': 'X Axis',
                    'tooltip': false
                },
                'ticklabel': {
                    'fontSize': 10,
                    'fontStyle': 'normal',
                    'fontWeight': 'bold',
                    'alignMode': 'rotate'
                },
                'grid': {
                    'show': false
                },
                'categories': [],
                'axisline': {
                    'show': false
                },
                'tickmark': {
                    'show': false
                }
            },

            "chartPlot": { //ltPropChartPlot
                'allowDuplicateCategories': false,
                'miniature': false
            },

            "chartPlotAnimation": { //ltPropChartPlotAnimation
                'duration': 300,
                'easingType': 'linear',
                'enabled': true
            },

            "chartPlotMorph": { //ltPropChartPlotMorph
                'enabled': false
            },

            "chartPlotBorder": { //ltPropChartPlotBorder
                'color': 'transparent',
                'radius': 0,
                'show': false,
                'size': 1,
                'style': 'solid'
            },

            "chartPlotDatalabels": { //ltPropChartPlotDatalabels
                'fontSize': 10,
                'fontStyle': 'normal',
                'fontWeight': 'normal',
                'handleOverlapping': true,
                'show': false,
                'textShadow': '1px 1px 1px grey'
            },

            "chartScroll": { //ltPropChartScroll
                'categoryThickness': 15,
                'enabled': false,
                'height': 10,
                'minimumVisiblePoints': 3,
                'renderVisiblePointsOnly': true
            },

            "chartZoom": { //ltPropChartZoom
                'enabled': false,
                'minZoom': 1,
                'maxZoom': 'auto',
                'transitionDuration': 1000,
                'pan': true,
                'wheelZoom': true,
                'minimumVisiblePoints': 3,
                'renderVisiblePointsOnly': true
            }
        };
        return {
            data: Lyte.attr("object", { watch: true }),

            // Actual Data
            /**
             * @componentProperty {object} ltPropMetaDataAxes
             * @default {}
             * @input
             */
            ltPropMetaDataAxes: Lyte.attr("object", { "default": {}, 'in': true }),
            /**
             * @componentProperty {array} ltPropMetaDataColumns
             * @default []
             * @input
             */
            ltPropMetaDataColumns: Lyte.attr("array", { "default": [], 'in': true }),
            /**
             * @componentProperty {object} ltPropSeriesData
             * @default {}
             * @input
             */
            ltPropSeriesData: Lyte.attr("object", { watch: true, 'in': true }),
            /**
             * @componentProperty { bar | bullet | dial | funnel | line | packedbubble | pie | pyramid | sunburst | treemap | web | wordcloud } ltPropType = bar
             * @default ""
             * @input
             */
            ltPropType: Lyte.attr("string", { "default": "", 'in': true }),

            // Canvas Properties
            /**
             * @componentProperty {string} ltPropCanvasTitle
             * @default Chart Title
             * @input
             */
            ltPropCanvasTitle: Lyte.attr("string", { "default": "Chart Title", 'in': true }),
            /**
             * @componentProperty {string} ltPropCanvasSubtitle
             * @default ''
             * @input
             */
            ltPropCanvasSubtitle: Lyte.attr("string", { "default": "", 'in': true }),

            /**
             * @typedef {object} canvasBackgroundGradients
             * @property {boolean} show=false
             * @property {array} stopColor
             * @property {array} stopOffset
             * @property {linear | radial | null} type
             * @property {string} useCSS
             */
            /**
             * @typedef {object} canvasBackground
             * @property {number} alpha=1
             * @minValue 0
             * @maxValue 1
             * @property {string} color
             * @property {string} imageUrl
             * @property {repeat | repeat-x | repeat-y | no-repeat | none} imageRepeat=none
             * @property {canvasBackgroundGradients} gradients {'show':false}
             */
            /**
             * @componentProperty {canvasBackground} ltPropCanvasBackground
             * @default { 'alpha': 1, imageUrl=null, 'imageRepeat': 'none', 'gradients': { 'show': false }}
             * @input
             */
            ltPropCanvasBackground: Lyte.attr("object", { "default": defaultChartData.canvasBackground, 'in': true }),

            /**
             * @typedef {object} canvasBorder
             * @property {string} color=#666
             * @property {number} radius=1
             * @property {boolean} show=true
             * @property {number} size=1
             * @property {solid | dotted | dashed | groove | ridge | inset | outset | none} style=solid
             */
            /**
             * @componentProperty {canvasBorder} ltPropCanvasBorder
             * @default { 'color': '#666', 'radius': 1, 'show': true, 'size': 1, 'style': 'solid'}
             * @input
             */
            ltPropCanvasBorder: Lyte.attr("object", { "default": defaultChartData.canvasBorder, 'in': true }),

            /**
             * @componentProperty {object} ltPropCanvasIntelligence
             * @default {}
             * @input
             */
            ltPropCanvasIntelligence: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} canvasShadow
             * @property {boolean} show=true
             * @property {string} blur=2
             * @property {string} color=rgba(0, 0, 0, 0.1)
             * @property {boolean} inset=false
             * @property {number} x=1
             * @property {number} y=1
             */
            /**
             * @componentProperty {canvasShadow} ltPropCanvasShadow
             * @default { 'blur': 2, 'color': 'rgba(0, 0, 0, 0.1)', 'inset': false, 'show': true, 'x': 1, 'y': 1 }
             * @input
             */
            ltPropCanvasShadow: Lyte.attr("object", { "default": defaultChartData.canvasShadow, 'in': true }),

            /**
             * @typedef {object} titleStyle
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize=15
             * @property {normal | italic | oblique} fontStyle=normal
             * @property {normal | bold | lighter | bolder} fontWeight=normal
             * @property {left | right | center} hAlign=left
             * @property {number} marginBottom
             * @property {number} marginLeft
             * @property {number} marginRight
             * @property {number} marginTop
             * @property {boolean} show=true
             * @property {boolean} tooltip=false
             * @property {top | bottom} vAlign = top
             * @property {number} x
             * @property {number} y
             * @property {string} href
             * @property {newtab | newwindow | null} target
             */
            /**
             * @componentProperty {titleStyle} ltPropTitleStyle
             * @default { 'fontSize': 15, 'fontStyle': "normal", 'fontWeight': "normal", 'show': true, 'hAlign': 'left', 'vAlign': 'top', 'tooltip': false }
             * @input
             */
            ltPropTitleStyle: Lyte.attr("object", { "default": defaultChartData.titleStyle, 'in': true }),

            /**
             * @typedef {object} subtitleStyle
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize=13
             * @property {normal | italic | oblique} fontStyle=normal
             * @property {normal | bold | lighter | bolder} fontWeight=normal
             * @property {left | right | center} hAlign
             * @property {number} marginBottom
             * @property {number} marginLeft
             * @property {number} marginRight
             * @property {number} marginTop
             * @property {boolean} show=true
             * @property {boolean} tooltip=false
             * @property {top | bottom} vAlign = top
             * @property {number} x
             * @property {number} y
             * @property {string} href = null
             * @property {newtab | newwindow | null} target=null
             * @input
            */

            /**
             * @componentProperty {subtitleStyle} ltPropSubtitleStyle
             * @default { 'fontSize': 13, 'fontStyle': 'normal', 'fontWeight': 'normal', 'show': true, 'tooltip': false, 'vAlign': 'top' }
             */
            ltPropSubtitleStyle: Lyte.attr("object", { "default": defaultChartData.subtitleStyle, 'in': true }),

            /**
             * @typedef {object} canvasStyle
             * @property { defaultTheme | elegant | flatui | transparent | zo } theme = defaultTheme
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize=10
             * @property {normal | italic | oblique} fontStyle=normal
             * @property {normal | bold | lighter | bolder} fontWeight=normal
             */
            /**
             * @componentProperty {canvasStyle} ltPropCanvasStyle
             * @default { 'fontSize': 10, 'fontStyle': 'normal', 'fontWeight': 'normal', 'theme': 'defaultTheme' }
             * @input
             */
            ltPropCanvasStyle: Lyte.attr("object", { "default": defaultChartData.canvasStyle, 'in': true }),

            /**
             * @typedef {object} canvasAccessibility
             * @property {boolean} enabled=false
             * @property {img | radio | checkbox | button} role
             * @property {string} title
             * @property {string} titleMapId
             * @property {string} descriptionMapId
             */
            /**
             * @componentProperty {canvasAccessibility} ltPropCanvasAccessibility
             * @default {'enabled': false}
             * @input
             */
            ltPropCanvasAccessibility: Lyte.attr("object", { "default": defaultChartData.canvasAccessibility, 'in': true }),

            // Credit Properties
            /**
             * @componentProperty {boolean} ltPropCreditsEnabled
             * @default false
             * @input
             */
            ltPropCreditsEnabled: Lyte.attr("boolean", { "default": false, 'in': true }),

            /**
             * @componentProperty {string} ltPropCreditsText
             * @default Reports
             * @condition ltPropCreditsEnabled true
             * @input
             */
            ltPropCreditsText: Lyte.attr("string", { "default": "Reports", 'in': true }),

            /**
             * @typedef {object} creditsStyle
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize=10
             * @property {normal | italic | oblique} fontStyle=normal
             * @property {normal | bold | lighter | bolder} fontWeight=normal
             * @property {left | right | center} hAlign=right
             * @property {number} marginBottom=10
             * @property {number} marginLeft=0
             * @property {number} marginRight=10
             * @property {number} marginTop=10
             * @property {string} href
             * @property { newtab | newwindow | null } target null
             * @property {boolean} tooltip=false
             * @property {top | middle | bottom} vAlign=bottom
             */

            /**
             * @componentProperty {creditsStyle} ltPropCreditsStyle
             * @condition ltPropCreditsEnabled true
             * @default { 'fontSize': 10, 'fontStyle': 'normal', 'fontWeight': 'normal', 'hAlign': 'right', 'target': 'null', 'marginBottom': 10, 'marginLeft': 0, 'marginRight': 10, 'marginTop': 10, 'tooltip': false, 'vAlign': 'bottom' }
             * @input
             */
            ltPropCreditsStyle: Lyte.attr("object", { "default": defaultChartData.creditsStyle, 'in': true }),

            // Loader Properties
            /**
             * @componentProperty {boolean} ltPropLoaderEnabled
             * @default false
             * @input
             */
            ltPropLoaderEnabled: Lyte.attr("boolean", { "default": false, 'in': true }),

            /**
             * @componentProperty {string} ltPropLoaderText
             * @default Loading...
             * @condition ltPropLoaderEnabled true
             * @input
             */
            ltPropLoaderText: Lyte.attr("string", { "default": "Loading...", 'in': true }),

            /**
             * @componentProperty { zBlocks | zBars | zCircle1 | zCircle2 | zCrossBars | wheel | snake } ltPropLoaderType
             * @default zBars 
             * @condition ltPropLoaderEnabled true
             * @input
             */
            ltPropLoaderType: Lyte.attr("string", { "default": "zBars", 'in': true }),

            /**
             * @typedef {object} loaderStyle
             * @property {string} colors=["rgb(204, 32, 50)", "rgb(24, 153, 74)", "rgb(1, 115, 178)", "rgb(253, 208, 25)"]
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize=10
             * @property {normal | italic | oblique} fontStyle=normal
             * @property {normal | bold | lighter | bolder} fontWeight=normal
             * @input
             */
            /**
             * @componentProperty {loaderStyle} ltPropLoaderStyle
             * @default { 'colors': ["rgb(204, 32, 50)", "rgb(24, 153, 74)", "rgb(1, 115, 178)", "rgb(253, 208, 25)"], 'fontSize': 10, 'fontStyle': 'normal', 'fontWeight': 'normal' }
             * @condition ltPropLoaderEnabled true
             * @input
             */
            ltPropLoaderStyle: Lyte.attr("object", { "default": defaultChartData.loaderStyle, 'in': true }),

            // Notes Properties
            /**
             * @componentProperty {boolean} ltPropNotesEnabled
             * @default false
             * @input
             */
            ltPropNotesEnabled: Lyte.attr("boolean", { "default": false, 'in': true }),

            /**
             * @componentProperty {customNote | stickyNote } ltPropNotesType
             * @default stickyNote
             * @condition ltPropNotesEnabled true
             * @input
             */
            ltPropNotesType: Lyte.attr("string", { "default": "stickyNote", 'in': true }),
            /**
             * @componentProperty {object} ltPropNotesBatch
             * @default {}
             * @condition ltPropNotesEnabled true
             * @input
             */
            ltPropNotesBatch: Lyte.attr("object", { "default": {}, 'in': true }),
            /**
             * @componentProperty {number} ltPropNotesDataIndex
             * @default 0
             * @condition ltPropNotesEnabled true
             * @input
             */
            ltPropNotesDataIndex: Lyte.attr("number", { "default": 0, 'in': true }),

            /**
             * @typedef {object} notesStyle
             * @property {string} maxWidth
             * @property {string} maxHeight
             * @property {scroll | clip | fire} overflow
             * @property {boolean} addOnDoubleclickEvent
             * @input
             */
            /**
             * @componentProperty {notesStyle} ltPropNotesStyle
             * @default {}
             * @condition ltPropNotesEnabled true
            * @input
             */
            ltPropNotesStyle: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @componentProperty {array} ltPropBlockValuesForNotes
             * @default []
             * @condition ltPropNotesEnabled true
             * @input
             */
            ltPropBlockValuesForNotes: Lyte.attr("array", { "default": [], 'in': true }),

            /**
             * @componentProperty {array} ltPropChartValuesForNotes
             * @default []
             * @condition ltPropNotesEnabled true
             * @input
             */
            ltPropChartValuesForNotes: Lyte.attr("array", { "default": [], 'in': true }),

            /**
             * @componentProperty {array} ltPropPlotValuesForNotes
             * @default []
             * @condition ltPropNotesEnabled true
             * @input
             */
            ltPropPlotValuesForNotes: Lyte.attr("array", { "default": [], 'in': true }),

            /**
             * @typedef {object} notesAnimation
             * @property {boolean} enabled
             * @property {number} delay
             * @property {number} duration
             */
            /**
             * @componentProperty {notesAnimation} ltPropNotesAnimation
             * @default {}
             * @condition ltPropNotesEnabled true
             * @input
             */
            ltPropNotesAnimation: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} stickyNoteOptions
             * @property {number} bodyBorderRadius
             * @property {number} bodyHeight
             * @property {number} bodyWidth
             * @property {string} border
             * @property {array} color
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize
             * @property {normal | italic | oblique} fontStyle
             * @property {normal | bold | lighter | bolder} fontWeight
             * @property {number} headBorderRadius
             * @property {number} headHeight
             * @property {number} headWidth
             * @property {open|close} mode
             * @property {string} shadow
             * @property {string} text
             * @property {string} htmlEl
             */
            /**
             * @componentProperty {stickyNoteOptions} ltPropNotesOptionsForStickyNote
             * @default {}
             * @condition ltPropNotesEnabled true
             * @condition ltPropNotesType stickyNote
             * @input
             */
            ltPropNotesOptionsForStickyNote: Lyte.attr("object", { "default": {}, 'in': true }),
            /**
            * @typedef {object} parserProperties
            * @property {object} styles
            */
            /**
            * @typedef {object} parser
            * @property {string} mark
            * @property {parserProperties} properties
            */
            /**
             * @typedef {object} customNoteOptions
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize
             * @property {normal | italic | oblique} fontStyle
             * @property {normal | bold | lighter | bolder} fontWeight
             * @property {string} htmlEl
             * @property {parser} parser
             * @property {string} parent
             */
           /**
             * @componentProperty {customNoteOptions} ltPropNotesOptionsForCustomNote
             * @default {}
             * @condition ltPropNotesEnabled true
             * @condition ltPropNotesType customNote
             * @input
             */
            ltPropNotesOptionsForCustomNote: Lyte.attr("object", { "default": {}, 'in': true }),

            //Legend Properties
            /**
             * @componentProperty {boolean} ltPropLegendEnabled
             * @default false
             * @input
             */
            ltPropLegendEnabled: Lyte.attr("boolean", { "default": false, 'in': true }),

            /**
             * @typedef {object} legendBackground
             * @property {number} alpha
             * @minValue 0
             * @maxValue 1
             * @property {string} color
             * @input
             */
            /**
             * @componentProperty {legendBackground} ltPropLegendBackground
             * @default {}
             * @condition ltPropLegendEnabled true
             */
            ltPropLegendBackground: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} legendBorder
             * @property {string} color=transparent
             * @property {number} radius=1
             * @property {boolean} show=true
             * @property {number} size=1
             * @property {string} style=solid
             * @input
             */
            /**
             * @componentProperty {legendBorder} ltPropLegendBorder
             * @default { 'color': 'transparent', 'radius': 1, 'show': true, 'size': 1, 'style': 'solid'}
             * @condition ltPropLegendEnabled true
             */
            ltPropLegendBorder: Lyte.attr("object", { "default": defaultChartData.legendBorder, 'in': true }),

            /**
             * @typedef {object} legendColorBox
             * @property {string} fillColor
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize=10
             * @property {square | circle | diamond | bean | butterfly | clover | cloverFour | cross | ellipse | heart |triangle-up |triangle-down | arrow | rocket | malteseCross | asterisk | gear | null} shape=square
             * @property {string} strokeColor
             * @property {number} strokeWidth=2
             * @property {string} text
             * @property {top | center | bottom} vAlign=center
             */
            /**
             * @componentProperty {legendColorBox} ltPropLegendColorBox
             * @default { 'fontSize': 12, 'shape': 'square', 'strokeWidth': 2, 'vAlign': 'center'}
             * @condition ltPropLegendEnabled true
             * @condition ltPropType area, bar, barrange, boxplot, bubblepie, funnel, gantt, heatmap, line, packedbubble, pie, pyramid, sankey, scatter, sunburst, treemap, waterfall, web, wordcloud
             * @input
             */
            ltPropLegendColorBox: Lyte.attr("object", { "default": defaultChartData.legendColorBox, 'in': true }),

            /**
             * @componentProperty {boolean} ltPropUseChartEffectForLegend
             * @default false
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropUseChartEffectForLegend: Lyte.attr("boolean", { "default": false, 'in': true }),

            /**
             * @typedef {object} legendColorBand
             * @property {string} borderRadius
             * @property {number} strokeWidth
             * @property {string} strokeColor
             * @property {number} strokeOpacity
             * @minValue 0
             * @maxValue 1
             * @property {number} fillOpacity
             * @minValue 0
             * @maxValue 1
             * @property {number} padding
             * @property {discrete | continuous | continuousDiscrete | none} type
             * @property {string} width
             * @property {number} height
             * @property {string} nullAs
             */
            /**
             * @componentProperty {legendColorBand} ltPropLegendColorBand
             * @default {}
             * @input
             * @condition ltPropType heatmap
             * @condition ltPropLegendEnabled true
             */
            ltPropLegendColorBand: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} legendColorAxis
             * @property {boolean} show=true
             * @property {boolean} reversed=false
             */
            /**
             * @componentProperty {legendColorAxis} ltPropLegendColorAxis
             * @default { 'show': true,'reversed': false }
             * @condition ltPropLegendEnabled true
             * @condition ltPropType heatmap
             * @input
             */
            ltPropLegendColorAxis: Lyte.attr("object", { "default": defaultChartData.legendColorAxis, 'in': true }),

            /**
             * @typedef {object} legendColorPallete
             * @property {muticolor | monochrome} type
             */
            /**
             * @componentProperty {legendColorPallete} ltPropLegendColorPallete
             * @default {}
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendColorPallete: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @componentProperty {array} ltPropLegendColors
             * @default []
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendColors: Lyte.attr("array", { "default": [], 'in': true }),

            /**
             * @componentProperty {object} ltPropLegendEvents
             * @default {}
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendEvents: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} legendExpandable
             * @property {boolean} show=false
             * @property {string} fontColor
             * @property {number} fontSize=10
             * @property {string} fontFamily
             * @property {string} textAlign=right
             * @property {string} text=more...
             */
            /**
             * @componentProperty {legendExpandable} ltPropLegendExpandable
             * @default { 'show': false, 'fontSize': 10, 'textAlign': 'right', 'text': "more..." }
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendExpandable: Lyte.attr("object", { "default": defaultChartData.legendExpandable, 'in': true }),

            /**
             * @typedef {object} legendSlider
             * @property {lever | triangleUp | triangleDown | circle | hollowCircle | vernier | pentagon} type=lever
             */
            /**
             * @typedef {object} legendFilter
             * @property {boolean} enabled=true
             * @property {legendSlider} slider
             */
            /**
             * @componentProperty {legendFilter} ltPropLegendFilter
             * @default {'enabled': true, 'slider': { 'type': 'lever' } }
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendFilter: Lyte.attr("object", { "default": defaultChartData.legendFilter, 'in': true }),

            /**
             * @componentProperty {object} ltPropLegendHighlightEffect
             * @default {}
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendHighlightEffect: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @componentProperty {linesndots | dotsfirst | stones} ltPropLegendImagePallete
             * @default ""
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendImagePallete: Lyte.attr("string", { "default": "", 'in': true }),

            /**
             * @typedef {object} legendStyle
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize
             * @property {normal | italic | oblique} fontStyle
             * @property {normal | bold | lighter | bolder} fontWeight
             * @property {left | right | center} hAlign
             * @property {number} itemMargin
             * @property {ellipsis | wrap} textOverflow
             * @property {number} marginBottom
             * @property {number} marginLeft
             * @property {number} marginRight
             * @property {number} marginTop
             * @property {boolean} tooltip
             * @property {top | center | bottom} vAlign
             * @property {horizontal|vertical} layout
             * @property {boolean} singleLayout
             */
            /**
             * @componentProperty {legendStyle} ltPropLegendStyle
             * @default {}
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendStyle: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} colorBox
             * @property {boolean} grayScale=false
             * @property {string} fontColor
             * @property {string} text
             * @property {number} fillOpacity
             * @minValue 0
             * @maxValue 1
             */
            /**
             * @typedef {object} itemDisabledStyle
             * @property {string} color=#d1d1d1
             * @property {boolean} strikeout=false
             * @property {colorBox} colorBox
             *
             */
            /**
             * @typedef {object} itemDisabledStyle
             * @property {string} color=#d1d1d1
             * @property {boolean} strikeout=false
             * @property {colorBox} colorBox
             *
             */
            /**
             * @componentProperty {itemDisabledStyle} ltPropLegendItemDisabledStyle
             * @default  {'color': '#d1d1d1', 'strikeout': false, 'colorBox': { 'grayScale': false }}
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendItemDisabledStyle: Lyte.attr("object", { "default": defaultChartData.legendItemDisabledStyle, 'in': true }),

            /**
             * @typedef {object} legendItemHoverStyle
             * @property {string} backgroundColor=transparent
             * @property {string} fontColor
             * @property {normal | italic | oblique} fontStyle=normal
             * @property {normal | bold | lighter | bolder} fontWeight=normal
             * @property {boolean} showOnDataHover=false
             * @property {string} textShadow=1px 1px 1px grey
             * @property {number} triggerOffset=10
             * @property {line | triangleUp | triangleDown | triangleUpDown | box | enlarge | none} type=triangleUp
             */
            /**
             * @componentProperty {legendItemHoverStyle} ltPropLegendItemHoverStyle
             * @default { 'backgroundColor': 'transparent', 'fontStyle': 'normal', 'fontWeight': 'normal', 'showOnDataHover': false, 'textShadow': '1px 1px 1px grey', 'triggerOffset': 10, 'type': 'triangleUp' }
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendItemHoverStyle: Lyte.attr("object", { "default": defaultChartData.legendItemHoverStyle, 'in': true }),

            /**
             * @componentProperty {object} ltPropLegendShadow
             * @default {}
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendShadow: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @componentProperty {string} ltPropLegendTitle
             * @default Legend
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendTitle: Lyte.attr("string", { "default": "Legend", 'in': true }),

            /**
             * @typedef {object} legendTitleStyle
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize
             * @property {normal | italic | oblique} fontStyle
             * @property {normal | bold | lighter | bolder} fontWeight
             * @property {boolean} show
             * @property {boolean} keepAligned
             */
            /**
             * @componentProperty {legendTitleStyle} ltPropLegendTitleStyle
             * @default {}
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendTitleStyle: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} legendSelectAllBox
             * @property {boolean} show=false
             * @property {number} strokeWidth=1
             * @property {string} fillColor=transparent
             * @property {number} disabledOpacity=0.3
             * @minValue 0
             * @maxValue 1
             * @property {boolean} selected=true
             * @property {string} strokeColor
             * @property {string} fontColor
             * @property {square | circle | diamond | bean | butterfly | clover | cloverFour | cross | ellipse | heart |triangle-up |triangle-down | arrow | rocket | malteseCross | asterisk | gear | null} shape=square
             */
            /**
             * @componentProperty {legendSelectAllBox} ltPropLegendSelectAllBox
             * @default {'show': false, 'strokeWidth': 1, 'fillColor': 'transparent', 'disabledOpacity': 0.3, 'selected': true, 'shape': 'square'}
             * @condition ltPropLegendEnabled true
             */
            ltPropLegendSelectAllBox: Lyte.attr("object", { "default": defaultChartData.legendSelectAllBox, 'in': true }),

            /**
             * @componentProperty {object} ltPropLegendSize
             * @default {}
             * @condition ltPropLegendEnabled true
             * @input
             */
            ltPropLegendSize: Lyte.attr("object", { "default": {}, 'in': true }),

            //noDataHandler
            /**
             * @componentProperty {string} ltPropTextForNoDataHandler
             * @default No Data Available
             * @input
             */
            ltPropTextForNoDataHandler: Lyte.attr("string", { "default": "No Data Available", 'in': true }),

            /**
             * @typedef {object} noDataHandlerStyle
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize=10
             * @property {normal | italic | oblique} fontStyle=normal
             * @property {normal | bold | lighter | bolder} fontWeight=normal
             */

            /**
             * @componentProperty {noDataHandlerStyle} ltPropNoDataHandlerStyle
             * @default { 'fontSize': 10, 'fontStyle': 'normal', 'fontWeight': 'normal'}
             * @input
             * 
             */
            ltPropNoDataHandlerStyle: Lyte.attr("object", { "default": defaultChartData.noDataHandlerStyle, 'in': true }),

            //Tooltip
            /**
             * @componentProperty {boolean} ltPropTooltipEnabled
             * @default true
             * @input
             */
            ltPropTooltipEnabled: Lyte.attr("boolean", { "default": true, 'in': true }),

            /**
             * @typedef {object} tooltipStyle
             * @property {string} borderColor
             * @property {string} borderRadius
             * @property {string} borderStyle
             * @property {string} borderWidth
             * @property {string} content
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize
             * @property {normal | italic | oblique} fontStyle
             * @property {normal | bold | lighter | bolder} fontWeight
             * @property {relative | fixed | block} position
             * @property {string} maxWidth
             * @property {number} opacity
             * @minValue 0
             * @maxValue 1
             * @property {string} view
             * @property {number} zindex
             * @property {auto|none} pointerEvents
             * @property {number} hideDelay
             * @property {number} outerPadding
             */
            /**
             * @componentProperty {tooltipStyle} ltPropTooltipStyle
             * @default {}
             * @input
             */
            ltPropTooltipStyle: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @componentProperty {object} ltPropTooltipStructure
             * @default {}
             * @input
             */
            ltPropTooltipStructure: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @componentProperty {boolean} ltPropUseChartEffectForTooltip
             * @default true
             * @input
             */
            ltPropUseChartEffectForTooltip: Lyte.attr("boolean", { "default": true, 'in': true }),

            /**
             * @componentProperty {boolean} ltPropFocusOnTooltipEvent
             * @default false
             * @input
             */
            ltPropFocusOnTooltipEvent: Lyte.attr("boolean", { "default": false, 'in': true }),

            //Chart
            /**
             * @typedef {object} chartStyle
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize
             * @property {normal | italic | oblique} fontStyle
             * @property {normal | bold | lighter | bolder} fontWeight
             * @property {number} marginBottom
             * @property {number} marginLeft
             * @property {number} marginRight
             * @property {number} marginTop
             */
            /**
             * @componentProperty {chartStyle} ltPropChartStyle
             * @default {}
             * @input
             */
            ltPropChartStyle: Lyte.attr("object", { "default": {}, 'in': true }),
            /**
             * @componentProperty {boolean} ltPropChartAxesRotated
             * @default false
             * @input
             */
            ltPropChartAxesRotated: Lyte.attr("boolean", { "default": false, 'in': true }),
            /**
             * @componentProperty {object} ltPropChartBehavior
             * @default {}
             * @input
             */
            ltPropChartBehavior: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} chartAnimation
             * @property {boolean} enabled=true
             * @property {number} duration=600
             */
            /**
             * @componentProperty {chartAnimation} ltPropChartAnimation
             * @default {'enabled': true, 'duration': 600}
             * @input
             */
            ltPropChartAnimation: Lyte.attr("object", { "default": defaultChartData.chartAnimation, 'in': true }),

            /**
             * @typedef {object} xAxisLabel
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize=10
             * @property {normal | italic | oblique} fontStyle=normal
             * @property {normal | bold | lighter | bolder} fontWeight=bold
             * @property {number} marginBottom
             * @property {number} marginLeft
             * @property {number} marginRight
             * @property {number} marginTop
             * @property {boolean} show=true
             * @property {string} text=X Axis
             * @property {boolean} tooltip=false
             */
            /**
             * @typedef {object} xAxisTickLabel
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize=10
             * @property {normal | italic | oblique} fontStyle=normal
             * @property {normal | bold | lighter | bolder} fontWeight=bold
             * @property {number} marginBottom
             * @property {number} marginLeft
             * @property {number} marginRight
             * @property {number} marginTop
             * @property {rotate | zigzag | wrapOnSpace | wrapAll | auto} alignMode=rotate
             */
            /**
            * @typedef {object} xAxisGrid
            * @property {boolean} show=false
            * @property {string} color
            * @property {number} strokeWidth
            * @property {solid | shortdash | shortdot | shortdashdotdot | dotted | dashed | longdash | dashdot | longdashdot | longdashdotdot} style=solid
            */
            /**
            * @typedef {object} xAxisLine
            * @property {boolean} show=false
            * @property {string} color
            * @property {number} strokeWidth
            * @property {solid | dotted | dashed | groove | ridge | inset | outset | none} style=solid
            * @property {front|back} zindex
            */
            /**
            * @typedef {object} xAxisTickMark
            * @property {string} color
            * @property {center | between} align
            * @property {number} size
            * @property {number} strokeWidth
            */
            /**
             * @typedef {object} chartXaxis
             * @property {boolean} show=true
             * @property {boolean} reversed=false
             * @property {inner|outer} tickOrient=outer
             * @property {xAxisLabel} label = { 'fontSize': 10, 'fontStyle': 'normal', 'fontWeight': 'bold', 'show': true, 'text': 'X Axis', 'tooltip': false}
             * @property {xAxisTickLabel} ticklabel = { 'fontSize': 10, 'fontStyle': 'normal', 'fontWeight': 'bold', 'alignMode': 'rotate' }
             * @property {xAxisGrid} grid = { 'show': false }
             * @property {array} categories
             * @property {xAxisLine} axisline = { 'show': false }
             * @property {xAxisTickMark} axisline = { 'show': false }
             */
            /**
             * @componentProperty {chartXaxis} ltPropChartXaxis
             * @default { 'splitLeaves': 'false', 'reversed': false, 'show': true, 'tickOrient': 'outer', 'label': { 'fontSize': 10, 'fontStyle': 'normal', 'fontWeight': 'bold', 'show': true, 'text': 'X Axis', 'tooltip': false }, 'ticklabel': { 'fontSize': 10, 'fontStyle': 'normal', 'fontWeight': 'bold', 'alignMode': 'rotate' }, 'grid': { 'show': false }, 'categories': [], 'axisline': { 'show': false }, 'tickmark': { 'show': false } }
             * @input
             */
            ltPropChartXaxis: Lyte.attr("object", { "default": defaultChartData.chartXAxis, 'in': true }),

            /**
            * @componentProperty {array} ltPropChartYaxis
            * @default []
            * @input
            */
            ltPropChartYaxis: Lyte.attr("array", { "default": [], 'in': true }),

            /**
             * @componentProperty {object} ltPropChartEffects
             * @default {}
             * @input
             */
            ltPropChartEffects: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} chartPlot
             * @property {boolean} allowDuplicateCategories=false
             * @property {boolean} miniature=false
             */
            /**
             * @componentProperty {chartPlot} ltPropChartPlot
             * @default {'allowDuplicateCategories': false, 'miniature': false}
             * @input
             */
            ltPropChartPlot: Lyte.attr("object", { "default": defaultChartData.chartPlot, 'in': true }),

            /**
             * @typedef {object} chartPlotAnimation
             * @property {number} duration=300
             * @property {linear | quad | cubic | sin | exp | circle | elastic | back} easingType=linear
             * @property {boolean} enabled=true
             */
            /**
             * @componentProperty {chartPlotAnimation} ltPropChartPlotAnimation
             * @default { 'duration': 300, 'easingType': 'linear', 'enabled': true}
             * @input
             */
            ltPropChartPlotAnimation: Lyte.attr("object", { "default": defaultChartData.chartPlotAnimation, 'in': true }),

            /**
             * @typedef {object} chartPlotBackground
             * @property {string} color=#FFFFFF
             */
            /**
             * @componentProperty {chartPlotBackground} ltPropChartPlotBackground
             * @default {}
             * @input
             */
            ltPropChartPlotBackground: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} chartPlotBorder
             * @property {string} color=transparent
             * @property {number} radius=0
             * @property {boolean} show=false
             * @property {number} size=1
             * @property {solid | dotted | dashed | groove | ridge | inset | outset | none} style=solid
             */
            /**
             * @componentProperty {chartPlotBorder} ltPropChartPlotBorder
             * @default {'color': 'transparent', 'radius': 0, 'show': false, 'size': 1, 'style': 'solid'}
             * @input
             */
            ltPropChartPlotBorder: Lyte.attr("object", { "default": defaultChartData.chartPlotBorder, 'in': true }),

            /**
             * @typedef {object} chartPlotDatalabels
             * @property {string} fontColor
             * @property {string} fontFamily
             * @property {number} fontSize=10
             * @property {normal | italic | oblique} fontStyle=normal
             * @property {normal | bold | lighter | bolder} fontWeight=normal
             * @property {boolean} handleOverlapping=true
             * @property {boolean} show=false
             * @property {string} textShadow=1px 1px 1px grey
             */
            /**
             * @componentProperty {chartPlotDatalabels} ltPropChartPlotDatalabels
             * @default { 'fontSize': 10, 'fontStyle': 'normal', 'fontWeight': 'normal', 'handleOverlapping': true, 'show': false, 'textShadow': '1px 1px 1px grey'}
             * @input
             */
            ltPropChartPlotDatalabels: Lyte.attr("object", { "default": defaultChartData.chartPlotDatalabels, 'in': true }),

            /**
             * @componentProperty {object} ltPropChartPlotEvents
             * @default {}
             * @input
             */
            ltPropChartPlotEvents: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @componentProperty {object} ltPropChartPlotEventHandler
             * @default {}
             * @input
             */
            ltPropChartPlotEventHandler: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} chartPlotMorph
             * @property {boolean} enabled=false
             */
            /**
             * @componentProperty {chartPlotMorph} ltPropChartPlotMorph
             * @default {enabled: false}
             * @input
             */
            ltPropChartPlotMorph: Lyte.attr("object", { "default": defaultChartData.chartPlotMorph, 'in': true }),

            /**
             * @componentProperty {object} ltPropChartPlotOptions
             * @default {}
             * @input
             */
            ltPropChartPlotOptions: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @componentProperty {object} ltPropChartPlotRenderer
             * @default {}
             * @input
             */
            ltPropChartPlotRenderer: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @typedef {object} chartScroll
             * @property {number} categoryThickness=15
             * @property {boolean} enabled=false
             * @property {number} height=10
             * @property {number} minimumVisiblePoints=3
             * @property {boolean} renderVisiblePointsOnly=true
             */
            /**
             * @componentProperty {chartScroll} ltPropChartScroll
             * @default {'categoryThickness': 15, 'enabled': false, 'height': 10, 'minimumVisiblePoints': 3, 'renderVisiblePointsOnly': true}
             * @input
             */
            ltPropChartScroll: Lyte.attr("object", { "default": defaultChartData.chartScroll, 'in': true }),

            /**
             * @componentProperty {object} ltPropChartBrush
             * @default {}
             * @input
             */
            ltPropChartBrush: Lyte.attr("object", { "default": {}, 'in': true }),
            /**
             * @typedef {object} chartZoom
             * @property {boolean} enabled=false
             * @property {number} minZoom=1
             * @property {number} maxZoom=auto
             * @property {number} transitionDuration=1000
             * @property {boolean} pan=true
             * @property {boolean} wheelZoom=true
             * @property {number} minimumVisiblePoints=3
             * @property {boolean} renderVisiblePointsOnly=true
            */
            /**
             * @componentProperty {chartZoom} ltPropChartZoom
             * @default {'enabled': false, 'minZoom': 1, 'maxZoom': 'auto', 'transitionDuration': 1000, 'pan': true, 'wheelZoom': true, 'minimumVisiblePoints': 3, 'renderVisiblePointsOnly': true}
             * @input
             */
            ltPropChartZoom: Lyte.attr("object", { "default": defaultChartData.chartZoom, 'in': true }),

            //Events

            /**
             * @componentProperty {object} ltPropAxesEvents
             * @default {}
             * @input
             */
            ltPropAxesEvents: Lyte.attr("object", { "default": {}, 'in': true }),
            /**
             * @componentProperty {object} ltPropLegendEvents
             * @default {}
             * @input
             */
            ltPropLegendEvents: Lyte.attr("object", { "default": {}, 'in': true }),
            /**
             * @componentProperty {object} ltPropLegendActions
             * @default {}
             * @input
             */
            ltPropLegendActions: Lyte.attr("object", { "default": {}, 'in': true }),

            /**
             * @componentProperty {boolean} ltPropRedraw
             * @default false
             * @input
             */
            ltPropRedraw: Lyte.attr("boolean", { "default": false, 'in': true }),

            /**
             * @componentProperty {boolean} ltPropEnableRedrawOnResize
             * @default true
             * @input
             */
            ltPropEnableRedrawOnResize: Lyte.attr("boolean", { "default": true, 'in': true }),

            methods: Lyte.attr("object", { "default": {} }),
            chartData: Lyte.attr("object", { "default": {}, watch: true })
        }
    },
    isEmptyObject: function (obj) {
        return Object.keys(obj).length === 0;
    },
    copyObjectValues: function (propName, propObj) {
        var propStyle = this.getData(propName) || {};
        if (!this.isEmptyObject(propStyle)) {
            for (let key of Object.keys(propStyle)) {
                propObj[key] = propStyle[key]
            }
        }
    },
    getEvent: function (eventName) {
        var self = this;
        return function (event, chartObject) {
            if (self.getMethods(eventName)) {
                self.executeMethod(eventName, event, chartObject);
            }
        };
    },
    createCanvasEvents: function () {
        var eventsObj = {
            'init': function (event, chartaObj) {
                if (this.getMethods('onCanvasInit')) {
                    /**
                     * This callback is fired on initialization of rendering the chart.
                     * @method onCanvasInit
                     * @version 1.112.0
                     * @param { object } event
                     * @param { object } chartaObj
                     */
                    this.executeMethod('onCanvasInit', this, event, chartaObj);
                }
            }.bind(this),
            'onerror': function (event, chartaObj, error) {
                if (this.getMethods('onCanvasError')) {
                    /**
                     * This callback is fired when an error occurs while rendering the chart.
                     * @method onCanvasError
                     * @version 1.112.0
                     * @param { object } event
                     * @param { object } chartaObj
                     * @param { object } errorObject
                     */
                    this.executeMethod('onCanvasError', this, event, chartaObj, error);
                }
            }.bind(this),
            'onload': function (event, chartaObj) {
                if (this.getMethods('onCanvasLoad')) {
                    /**
                     * This callback is fired when the chart is successfully loaded.
                     * @method onCanvasLoad
                     * @version 1.112.0
                     * @param { object } event
                     * @param { object } chartaObj
                     */
                    this.executeMethod('onCanvasLoad', this, event, chartaObj);
                }
            }.bind(this),
            'onreload': function (event, chartaObj) {
                if (this.getMethods('onCanvasReload')) {
                    /**
                     * This callback is fired when the chart is reloaded.
                     * @method onCanvasReload
                     * @version 1.112.0
                     * @param { object } event
                     * @param { object } chartaObj
                     */
                    this.executeMethod('onCanvasReload', this, event, chartaObj);
                }
            }.bind(this),
            'destroy': function (event, chartaObj) {
                if (this.getMethods('onCanvasDestroy')) {
                    /**
                     * This callback is fired when the chart is destroyed.
                     * @method onCanvasDestroy
                     * @version 1.112.0
                     * @param { object } event
                     * @param { object } chartaObj
                     */
                    this.executeMethod('onCanvasDestroy', this, event, chartaObj);
                }
            }.bind(this)
        };
        return eventsObj;
    },
    buildChartData: function () {

        var chartData = {};

        var canvas = this.getData('ltPropCanvasStyle')
        var canvasObj = {};
        if (canvas && canvas.theme) {
            canvasObj.theme = canvas.theme;
        } else {
            canvasObj.theme = 'defaultTheme';
        }
        // if (canvas.theme) {
        // 	if (canvas.theme === 'pencil') {
        // 		var pencil = $ZC.getTheme('pencil');
        // 		canvasObj.theme = pencil;
        // 	}
        // 	else if (canvas.theme === 'zo') {
        // 		var zo = $ZC.getTheme('zo');
        // 		canvasObj.theme = zo;
        // 	}
        // 	else if (canvas.theme === 'defaultTheme') {
        // 		var defaultTheme = $ZC.getTheme('defaultTheme');
        // 		canvasObj.theme = defaultTheme;
        // 	}
        // 	else if (canvas.theme === 'elegant ') {
        // 		var elegant = $ZC.getTheme('elegant');
        // 		canvasObj.theme = elegant;
        // 	}
        // 	else if (canvas.theme === 'flatui') {
        // 		var flatui = $ZC.getTheme('flatui');
        // 		canvasObj.theme = flatui;
        // 	}
        // 	else if (canvas.theme === 'transparent') {
        // 		var transparent = $ZC.getTheme('transparent');
        // 		canvasObj.theme = transparent;

        // 	}
        // }
        canvasObj.background = this.getData('ltPropCanvasBackground');
        canvasObj.border = this.getData('ltPropCanvasBorder');
        canvasObj.intelligence = this.getData('ltPropCanvasIntelligence');
        canvasObj.shadow = this.getData('ltPropCanvasShadow');
        canvasObj.accessibility = this.getData('ltPropCanvasAccessibility');

        // These Objects need to be expanded
        var subtitleStyle = this.getData('ltPropSubtitleStyle');
        subtitleStyle.text = this.getData('ltPropCanvasSubtitle');
        canvasObj.subtitle = subtitleStyle

        var titleStyle = this.getData('ltPropTitleStyle')
        titleStyle.text = this.getData('ltPropCanvasTitle');
        canvasObj.title = titleStyle

        //General Style
        this.copyObjectValues('ltPropCanvasStyle', canvasObj);
        canvasObj.events = this.createCanvasEvents();
        chartData.canvas = canvasObj;

        // Credits Properties
        var creditsObj = {};
        var creditsEnabled = this.getData('ltPropCreditsEnabled');
        if (creditsEnabled) {
            this.copyObjectValues('ltPropCreditsStyle', creditsObj);
            creditsObj.enabled = creditsEnabled;
            creditsObj.text = this.getData('ltPropCreditsText');
            chartData.credits = creditsObj;
        }

        // Loader Properties
        var loaderObj = {};
        var loaderEnabled = this.getData('ltPropLoaderEnabled');
        if (loaderEnabled) {
            this.copyObjectValues('ltPropLoaderStyle', loaderObj);
            loaderObj.enabled = creditsEnabled;
            loaderObj.text = this.getData('ltPropLoaderText');
            loaderObj.type = this.getData('ltPropLoaderType');
            chartData.loader = loaderObj;
        }

        //Notes Properties
        var notesObj = {};
        var notesEnabled = this.getData('ltPropNotesEnabled');
        if (notesEnabled) {
            this.copyObjectValues('ltPropNotesStyle', notesObj);
            notesObj.type = this.getData('ltPropNotesType');
            notesObj.batch = this.getData('ltPropNotesBatch');
            notesObj.enabled = true;
            notesObj.dataIndex = this.getData('ltPropNotesDataIndex');

            if (this.getData('ltPropBlockValuesForNotes') && this.getData('ltPropBlockValuesForNotes').length > 0) {
                notesObj.blockValues = this.getData('ltPropBlockValuesForNotes');
            }
            if (this.getData('ltPropChartValuesForNotes') && this.getData('ltPropChartValuesForNotes').length > 0) {
                notesObj.chartValues = this.getData('ltPropChartValuesForNotes');
            }
            if (this.getData('ltPropPlotValuesForNotes') && this.getData('ltPropPlotValuesForNotes').length > 0) {
                notesObj.plotValues = this.getData('ltPropPlotValuesForNotes');
            }
            if (!this.isEmptyObject(this.getData('ltPropNotesAnimation'))) {
                notesObj.animation = this.getData('ltPropNotesAnimation');
            }

            if (!this.isEmptyObject(this.getData('ltPropNotesOptionsForStickyNote'))) {
                notesObj.options = {};
                notesObj.options.stickyNote = this.getData('ltPropNotesOptionsForStickyNote');
            }
            if (!this.isEmptyObject(this.getData('ltPropNotesOptionsForCustomNote'))) {
                if (!notesObj.options) {
                    notesObj.options = {};
                }
                notesObj.options.customNote = this.getData('ltPropNotesOptionsForCustomNote');
            }
            chartData.notes = notesObj;
        }

        //NoDataHandler
        var noDataHandlerObj = {};
        noDataHandlerObj = this.getData('ltPropNoDataHandlerStyle');
        noDataHandlerObj.text = this.getData('ltPropTextForNoDataHandler');

        //Tooltip
        var tooltipObj = {};
        var tooltipEnabled = this.getData('ltPropTooltipEnabled');
        if (tooltipEnabled) {
            if (!this.isEmptyObject(this.getData('ltPropTooltipStyle'))) {
                tooltipObj = this.getData('ltPropTooltipStyle');
            }
            tooltipObj.enabled = true;
            if (!this.isEmptyObject(this.getData('ltPropTooltipStructure'))) {
                tooltipObj.content = this.getData('ltPropTooltipStructure').content;
                tooltipObj.footerContent = this.getData('ltPropTooltipStructure').footerContent;
                tooltipObj.headerContent = this.getData('ltPropTooltipStructure').headerContent;
                tooltipObj.sharedSeriesInfo = this.getData('ltPropTooltipStructure').sharedSeriesInfo;
            }

            tooltipObj.useChartEffect = this.getData('ltPropUseChartEffectForTooltip');
            tooltipObj.focusOnTooltipEvent = this.getData('ltPropFocusOnTooltipEvent');
            chartData.tooltip = tooltipObj;
        }
        // Legend Properties
        var legendObj = {};
        var legendEnabled = this.getData('ltPropLegendEnabled');
        legendObj.title = {};
        if (legendEnabled) {
            this.copyObjectValues('ltPropLegendStyle', legendObj);
            this.copyObjectValues('ltPropLegendTitleStyle', legendObj.title);
            legendObj.enabled = true;
            legendObj.background = this.getData('ltPropLegendBackground');
            legendObj.border = this.getData('ltPropLegendBorder');
            legendObj.colorBox = this.getData('ltPropLegendColorBox');
            legendObj.useChartEffect = this.getData('ltPropUseChartEffectForLegend');
            if (!this.isEmptyObject('ltPropLegendColorBand')) {
                legendObj.colorBand = this.getData('ltPropLegendColorBand');
            }
            if (!this.isEmptyObject('ltPropLegendColorAxis')) {
                legendObj.colorAxis = this.getData('ltPropLegendColorAxis');
            }
            if (!this.isEmptyObject('ltPropLegendColorPallete')) {
                legendObj.colorPallete = this.getData('ltPropLegendColorPallete');
            }
            if (this.getData('ltPropLegendColors').length > 0) {
                legendObj.colors = this.getData('ltPropLegendColors');
            }
            legendObj.events = this.getData('ltPropLegendEvents');
            legendObj.expandable = this.getData('ltPropLegendExpandable');
            legendObj.filter = this.getData('ltPropLegendFilter');
            legendObj.highlightEffect = this.getData('ltPropLegendHighlightEffect');
            legendObj.imagePallete = this.getData('ltPropLegendImagePallete');
            legendObj.itemDisabledStyle = this.getData('ltPropLegendItemDisabledStyle');
            legendObj.itemHoverStyle = this.getData('ltPropLegendItemHoverStyle');
            legendObj.shadow = this.getData('ltPropLegendShadow');
            legendObj.title.text = this.getData('ltPropLegendTitle');
            legendObj.selectAllBox = this.getData('ltPropLegendSelectAllBox');
            legendObj.size = this.getData('ltPropLegendSize');
            legendObj.events.enabled = true;
            legendObj.events = this.getData('ltProplegendEvents');
            legendObj.actions = this.getData('ltProplegendActions');
        }
        else {
            legendObj.enabled = false;
        }
        chartData.legend = legendObj;

        //chartstyle, chartplot
        //ChartProperties
        var chartObj = {};
        chartObj.axes = {};
        chartObj.plot = {};
        chartObj.axes.rotated = this.getData('ltPropChartAxesRotated');
        this.copyObjectValues('ltPropChartStyle', chartObj);
        this.copyObjectValues('ltPropChartPlot', chartObj.plot);
        chartObj.behavior = this.getData('ltPropChartBehavior');
        chartObj.axes.animation = this.getData('ltPropChartAnimation');
        chartObj.axes.xaxis = this.getData('ltPropChartXaxis');
        chartObj.axes.yaxis = this.getData('ltPropChartYaxis');
        if (!this.isEmptyObject('ltPropChartEfects')) {
            chartObj.effects = this.getData('ltPropChartEffects');
        }
        chartObj.plot.animation = this.getData('ltPropChartPlotAnimation');
        chartObj.plot.background = this.getData('ltPropChartPlotBackground');
        chartObj.plot.border = this.getData('ltPropChartPlotBorder');
        chartObj.plot.datalabels = this.getData('ltPropChartPlotDatalabels');
        chartObj.plot.events = this.getData('ltPropChartPlotEvents');
        chartObj.plot.eventHandler = this.getData('ltPropChartPlotEventHandler');
        chartObj.plot.morph = this.getData('ltPropChartPlotMorph');
        if (!this.isEmptyObject('ltPropChartPlotOptions')) {
            chartObj.plot.plotoptions = this.getData('ltPropChartPlotOptions');
        }
        chartObj.plot.renderer = this.getData('ltPropChartPlotRenderer');
        chartObj.scroll = this.getData('ltPropChartScroll');
        chartObj.brush = this.getData('ltPropChartBrush');
        chartObj.zoom = this.getData('ltPropChartZoom');
        chartObj.axes.events = this.getData('ltPropAxesEvents');
        chartData.chart = chartObj;
        //MetaData
        //SeriesData
        var metaDataAxes = this.getData('ltPropMetaDataAxes') || {};
        var metaDataColumns = this.getData('ltPropMetaDataColumns') || {};

        var metaData = {};
        metaData.axes = metaDataAxes;
        metaData.columns = metaDataColumns;
        chartData.metadata = metaData;
        var seriesData = this.getData('ltPropSeriesData') || {};
        seriesData.type = this.getData('ltPropType') || seriesData.type;
        chartData.seriesdata = seriesData;

        this.setData('chartData', chartData);
        return chartData;
    },
    initializeChart: function () {
        var chartData;
        chartData = this.buildChartData();
        if (chartData) {
            var domPlaceholder = this.$node.querySelector(".lyteChartOutlet");
            var chartResult = this.renderChart(chartData, domPlaceholder);

            // Handle both: Promise or direct object
            if (chartResult && typeof chartResult.then === "function") {
                // It's a Promise
                chartResult
                    .then((chartObj) => {
                        this.chartObj = chartObj;
                    })
                    .catch((err) => {
                        console.error("Chart rendering failed:", err);
                    });
            } else {
                // It's the chart object itself
                this.chartObj = chartResult;
            }
        }
    },

    renderChart: function (chartData, domPlaceholder) {
        try {
            var chartResult = $ZC.charts(domPlaceholder, chartData, true);
            // chartResult could be a Promise OR a chart object
            if (chartResult && typeof chartResult.then === "function") {
                // Return the Promise directly
                return chartResult.then((chartObj) => {
                    this.chartObj = chartObj;
                    return chartObj;
                });
            } else {
                // Direct object — assign immediately
                this.chartObj = chartResult;
                return chartResult;
            }
        } catch (err) {
            console.error("Chart render failed:", err);
        }
    },
    destroyChart: function () {
        const chartObj = this.chartObj;
        if (chartObj) {
            if (chartObj.destroy && typeof chartObj.destroy === "function") {
                chartObj.destroy();
            }
            // if (chartObj.isMiniature) {
            // 	chartObj.sparkline.destroy();
            // } else {
            // }
            // delete this.chartObj;
        }
    },
    draw: function () {
        const self = this;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(function () {
            self.destroyChart();
            var chartData = self.initializeChart();
        }, 500);
    },
    addDifferKey: function (oldValue, newValue) {
        const oldKeys = Object.keys(oldValue);
        const newKeys = Object.keys(newValue);
        oldKeys.forEach(function (key) {
            if (!newKeys.includes(key)) {
                newValue[key] = {};
            }
        });
    },
    reDraw: function () {
        // const oldData = this.chartObj.userdata;
        // const newData = this.data.data;
        const oldData = this.getData('chartData');
        const newData = this.buildChartData();
        if (this.chartObj) {
            this.chartObj.userdata = newData;
        }
        this.addDifferKey(oldData, newData);
        var chartObj = this.draw();
        return chartObj;
    },
    mapInRefObject: function (key, value, dataObject) {
        // let tempObject = dataObject;
        const keys = key.split(".");
        const keyLength = keys.length - 1;
        for (let index = 0; index < keyLength; index++) {
            const tempKey = keys[index];
            if (dataObject.hasOwnProperty(tempKey)) {
                dataObject = dataObject[tempKey];
            }
            else {
                dataObject[tempKey] = {};
                dataObject = dataObject[tempKey];
            }
        }
        // tempMap[keys] = dataObject;
        dataObject[keys[keyLength]] = value;
    },
    setMethodAsData: function () {
        const methods = this.data.methods;
        // const data = this.data.data;
        const data = this.getData('chartData');
        for (const key in methods) {
            this.mapInRefObject(key, methods[key], data);
        }
    },
    convertMethodNameToDatakey: function (methodName) {
        let dataKey = "";
        for (let index = 0; index < methodName.length; index++) {
            let char = methodName[index],
                asciiValue = char.charCodeAt();
            if (char === "_") {
                index++
                dataKey += methodName[index].toUpperCase();
            }
            else if (65 <= asciiValue && asciiValue <= 90) {
                dataKey += ("." + char.toLowerCase());
            }
            else {
                dataKey += char;
            }
        }
        return dataKey;
    },
    triggerMethod: function (name, params) {
        const args = [name].concat(params);
        this.executeMethod.apply(this, args);
    },
    parseMethodToData: function () {
        const methodsData = this.data.methods;
        const compMethods = this.methods;
        const self = this;
        for (const key in compMethods) {
            methodsData[this.convertMethodNameToDatakey(key)] = function () {
                self.triggerMethod(key, Array.from(arguments));
            };
        }
    },
    ltPropRedrawObserver: function () {
        if (this.data.ltPropRedraw) {
            this.draw();
        }
        this.set("ltPropRedraw", false);
    }.observes("ltPropRedraw"),

    reDrawOnDataChange: function () {
        this.draw();
    }.observes('ltPropMetaDataAxes', 'ltPropMetaDataColumns.[]', 'ltPropSeriesData', 'ltPropType', 'ltPropCanvasTitle', 'ltPropCanvasSubtitle'),

    didConnect: function () {

        if (!window._pbArtboard) {
            this.parseMethodToData();
            this.setMethodAsData();
        }
        this.draw();
        var isRedrawOnResizeEnbled = this.getData("ltPropEnableRedrawOnResize");
        if (isRedrawOnResizeEnbled) {
            this.resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    if (entry.contentBoxSize) {
                        this.reDraw();
                    }
                }
            });

            this.resizeObserver.observe(this.$node);
        }
    },
    didDestroy: function () {
        this.destroyChart();
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        if (this.redrawTimeoutId) {
            clearTimeout(this.redrawTimeoutId);
        }
        delete this.redrawTimeoutId;
        delete this.timeoutId;
        if (this.resizeObserver) {
            this.resizeObserver.unobserve(this.$node);
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }

    }
});

/**
 * @syntax
 * @attribute ltPropType=bar
 * <lyte-chart  
 *   lt-prop-type="{{type}}"
 *   lt-prop-title="Chart Title"
 *   lt-prop-subtitle ="Chart Subtitle"
 *   lt-prop-series-data="{{seriesData}}"
 *   lt-prop-meta-data-axes = "{{metaDataAxes}}"
 *   lt-prop-meta-data-columns = "{{metaDataColumns}}"
 * ></lyte-chart>
 */