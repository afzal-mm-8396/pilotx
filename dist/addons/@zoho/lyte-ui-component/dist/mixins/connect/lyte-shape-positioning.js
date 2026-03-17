Lyte.Mixin.register("lyte-shape-positioning", {

  /*
    * try network kind of arrangement
    * find left_sibling, left_children, direct_children ( vertical originated from both top and bottom ), right_children, right_sibling
    * give preference for children than sibling
    * for multiple 
  */

  find_sibling : function( obj_format, connected_shapes, seperate_shapes, _render_with_arrange ){

    var __this = this,
    check_type = function( src, target ){
        var x1 = src.x,
        y1 = src.y,
        x2 = target.x,
        y2 = target.y,
        modify_vert1 = y1 > 0 && y1 < 1,
        modify_vert2 = y2 > 0 && y2 < 1,
        modify_hori1 = x1 > 0 && x1 < 1,
        modify_hori2 = x2 > 0 && x2 < 1,
        is_src_side = modify_vert1 && !modify_hori1,
        is_target_side = modify_vert2 && !modify_hori2;

        if( is_src_side ){
           if( is_target_side ){
              if( x1 ){
                  return "right_sibling";
              }
              return "left_sibling";
           } else {
              if( x1 ){
                return "right_children";
              }
              return "left_children";
           }
        } else{
           if( is_target_side ){
              if( !x2 ){
                return "right_children";
              }
              return "left_children";
           }
        }

        if( y1 == 0 ){
            if( x1 >= 0.5 ){
              if( y2 == 0 ){
                return 'right_sibling';
              }
              return "right_children";
            }
            if( y2 == 0 ){
              return 'left_sibling';
            }
            return "left_children";
        }

        return "direct_children"
    },
    fn = function( arr1, arr2, key, item, src_pos, tar_pos ){
        arr1.push({
          id : item,
          src_pos : src_pos,
          target_pos : tar_pos
        });

        arr2.push({
          id : key,
          src_pos : src_pos,
          target_pos : tar_pos
        });
    },

    dist = function( pt1, pt2 ){
        return Math.sqrt( Math.pow( pt1.x - pt2.x, 2 ) + Math.pow( pt1.y - pt2.y, 2 ) );
    },

    sort = function( arr, __ref ){
       
        arr.sort( function( a, b ){

            var __diff = dist( a.src_pos, __ref ) - dist( b.src_pos, __ref );

            if( __diff == 0 ){
               return b.target_pos.x - a.target_pos.x;
            }

            return __diff;
        });
    };

    for( var key in obj_format ){
        var __cur = obj_format[ key ],
        __from = __cur.from,
        __from_position = __cur.from_position;

        if( !__from.length &&  !__cur.to.length ){
           seperate_shapes.push( key );
           continue;
        } else {
           connected_shapes.push( key );
        }

        __from.forEach( function( item, index ){
            var other = obj_format[ item ],
            __to = other.to,
            __index = __to.indexOf( key ),
            src_pos = _render_with_arrange ? { x : 0.5, y : 1 } : __from_position[ index ] || {},
            tar_pos = _render_with_arrange ? { x : 0.5, y : 0 } : other.to_position[ __index ] || {},
            type,
            __sibling;

            if( __this.data.ltPropIgnoreSibling ){
              __sibling = "children";
              type = "direct_children";
            } else {
                switch( type = check_type( src_pos, tar_pos ) ){
                 case 'right_sibling' : 
                 case 'left_sibling' : {
                   __sibling = 'sibling';
                 }
                 break;
                 case 'right_children' : 
                 case 'left_children' : 
                 case 'direct_children' : {
                    __sibling = 'children';
                 }
                 break;
              }
            }

            fn( __cur[ type ], other[ __sibling ], key, item, src_pos, tar_pos );
        });

        sort( __cur.left_sibling, { x : 0, y : 0 } );
        sort( __cur.right_children, { x : 0.5, y : 1 } );
        sort( __cur.left_children, { x : 0.5, y : 1 } );
        sort( __cur.direct_children, { x : 0, y : 1 } );
        sort( __cur.right_sibling, { x : 1, y : 0 } );
    }
  },

  set_final_positions : function( obj_format, shapes, seperate_shapes, to_move ){
      var processed = {},
      width = 0,
      height = 0,
      hori_spacing = this.data.ltPropHorizontalSpacing,
      vert_spacing = this.data.ltPropVerticalSpacing,
      initial_offset = 0,
      ini_top = 0,
      is_hori = this.data.ltPropAlignDirection == "horizontal",
      move_construct = function( obj ){
        var __id = obj.id;

        to_move[ __id ] = {
            id : __id,
            position : {
              left : obj.left,
              top : obj.top
            },
            dimension : {
              width : obj.original_width,
              height : obj.original_height
            },
            old_position : obj_format[ __id ].position
        };

        [ 'left_sib', 'left_child', 'direct_child', 'right_child', 'right_sib' ].forEach( function( item ){
            obj[ item ].forEach( function( new_obj ){
                move_construct( new_obj );
            });
        });
      };

      seperate_shapes.forEach( function( item ){

        var __cur = obj_format[ item ],
        __dim = __cur.dimension;

        to_move[ item ] = {
            id : item,
            position : {
               left : initial_offset,
               top : ini_top
            },
            dimension : __dim,
            old_position : __cur.position
        };

        width = Math.max( __dim.width, width );

        ini_top += ( __dim.height + vert_spacing );
      });

      if( width ){
         width += hori_spacing;
      }

      shapes.forEach( function( item ){
          var ret = this.set_indiv_pos( obj_format, item, processed, 0 )

          if( ret ){
            if(this.data.ltPropCenterCommonItems && this.data.ltPropIgnoreSibling){
              this.arrangeData = this.arrangeData || {};
              this.arrangeData[item] = ret;
            }
            width && this.nested_modify( ret, 'left', width );
            height && this.nested_modify( ret, 'top', height );

            move_construct( ret );

            if( is_hori ){
              width += ( ret.width + hori_spacing );
            } else {
              height += ( ret.height + vert_spacing );
            }
          }
      }.bind( this ) );
  },

  nested_modify : function( ret, ns, value, is_downward ){

      if( !value ){
        return;
      }

      var down = (!is_downward && ns == 'top') ? -1 : 1;

      ret[ ns ] += (value * down);
      ret[ 'min_' + ns ] += (value * down);

      var __this = this,
      fn = function( item ){
          __this.nested_modify( item, ns, value, is_downward );
      };

      ret.left_sib.forEach( fn );

      ret.right_sib.forEach( fn );

      ret.left_child.forEach( fn );

      ret.right_child.forEach( fn );

      ret.direct_child.forEach( fn );
  },

  set_indiv_pos : function( obj_format, item, processed, level ){
      if( processed[ item ] ){
         return;
      }

      processed[ item ] = true;

      var  __this = this,
      __data = __this.data,
      config = {
          hori_spacing : __data.ltPropHorizontalSpacing,
          vert_spacing : __data.ltPropVerticalSpacing,
          hori_align : __data.ltPropAlignPosition.horizontal,
          vert_align : __data.ltPropAlignPosition.vertical,
          other_child_align : "horizontal",
          is_downward : __data.ltPropDownwardPosition,
          id : item,
          align_mid_children : __data.ltPropAlignMidChildren,
          common_child_spacing : __data.ltPropCommonChildrenSpacing
      },
      cb = "onBeforeProcess",
      __cur = obj_format[ item ];

      __cur.level = level;
      __this.getMethods( cb ) && __this.executeMethod( cb, this.data.details[ item ].data, __cur, config, __this.$node );

      var total__width = 0,
      total__height = 0,
      vert_spacing = config.vert_spacing,
      hori_spacing = config.hori_spacing,
      align_mid_children = config.align_mid_children,
      __dim = __cur.dimension,
      __width = __dim.width,
      __height = __dim.height,
      hori_align = config.hori_align,
      vert_align = config.vert_align,
      other_child_align = config.other_child_align,
      is_other_vert = other_child_align == "vertical",
      is_downward = config.is_downward,
      centerCommon = __data.ltPropCenterCommonItems && __data.ltPropIgnoreSibling,
      common_child_spacing = config.common_child_spacing,
      commonHangingChildren = {},
      hgt_find = function( arr ){
          var acc = 0,
          __arr = [],
          width = 0,
          deduct = 0;

          arr.forEach( function( __item, __index ){
              var ret = __this.set_indiv_pos( obj_format, __item.id, processed, level + 1 );

              if( !ret ){
                deduct++;
                return;
              }

              if( __index - deduct ){
                  acc += vert_spacing;
              }

              __this.nested_modify( ret, 'top', acc, is_downward  );

              acc += ret.height;
              width = Math.max( width, ret.width );

              __arr.push( ret );
          });

          if( hori_align == "middle" ){
            __arr.forEach( function( __item ){
                __this.nested_modify( __item, 'left', ( width - __item.width ) / 2, is_downward );
            });
          }

          return {
             arr : __arr,
             width : width,
             height : acc
          };
      },
      wdt_find = function( arr ){
         var acc = 0,
          __arr = [],
          height = 0,
          deduct = 0;

          arr.forEach( function( __item, __index ){

              var parent = obj_format[__item.id].to,
                  commonParent;

              if (centerCommon && parent.length > 1) {
                commonParent = getCommonParent(parent);
                if(commonParent == false){
                  deduct++;
                  return;
                }
              }

              var ret = __this.set_indiv_pos( obj_format, __item.id, processed, level + 1 );

              if(ret && centerCommon){
                obj_format[__item.id].vertSpacing = ret.vertSpacing = vert_spacing;
                __this.arrangeData = __this.arrangeData || {};
                __this.arrangeData[__item.id] = ret;
              }

              if(centerCommon && ret && Object.keys(ret.commonHangingChildren).length){
                for(var commonChild in ret.commonHangingChildren){
                  commonHangingChildren[commonChild] = (commonHangingChildren[commonChild] || []).concat(ret.commonHangingChildren[commonChild]);
                }
              }

              if( !ret || commonParent ){
                if(commonParent && ret){
                  commonHangingChildren[commonParent] = commonHangingChildren[commonParent] || [];
                  commonHangingChildren[commonParent].splice(0, 0, ret);
                }
                deduct++;
                return;
              }

              if( __index - deduct ){
                  acc += hori_spacing;
              }

              __this.nested_modify( ret, 'left', acc, is_downward );

              acc += ret.width;
              height = Math.max( height, ret.height );

              __arr.push( ret );
          });

          if( vert_align == "middle" ){
              __arr.forEach( function( __item ){
                __this.nested_modify( __item, 'top', ( height - __item.height ) / 2, is_downward );
              });
          }

          return {
             arr : __arr,
             width : acc,
             height : height
          };
      },
      adjust_top = function( ns, diff, arr ){
        var __min = 0,
        __max = 0,
        other = ( { left : "width", top : "height" } )[ ns ];

        diff && arr.forEach( function( item ){
          __this.nested_modify( item, ns, diff, is_downward );

          var modified_ns = "min_" + ns,
          __arr = [ __min, item[ modified_ns ] ],
          __arr1 = [ __max, item[ modified_ns ] + item[ other ] ],
          fn = function( __item ){
            __arr.push( __item[ modified_ns ] );
          },
          fn1 = function( __item ){
            __arr1.push( __item[ modified_ns ] + __item[ other ] );
          };

          item.left_sib.forEach( fn );
          item.left_child.forEach( fn );
          item.direct_child.forEach( fn );

          item.right_sib.forEach( fn1 );
          item.right_child.forEach( fn1 );
          item.direct_child.forEach( fn1 );

          __min = Math.min.apply( Math, __arr );
          __max = Math.max.apply( Math, __arr1 );
        });

        return {
          min : __min,
          max : __max
        };
      },
      adjust_hgt = function( hgt, __item, extra, sibling ){
          var arr = __item.arr,
          diff = ( extra == void 0 ? ( hgt - __item.height ) / 2 : 0 ) + ( extra || 0 );

          if( sibling && arr.length == 1 ){
            diff = ( hgt - arr[ 0 ].original_height ) / 2;
          }

          if( diff ){
            adjust_top( 'top', diff, arr );
          }
      },
      getCommonParent = function (parent) {
        var minLevel = Infinity,
          valid = parent.filter(function (item) {
            var itemData = obj_format[item],
              level = itemData.level;
            if (level < minLevel) {
              minLevel = level;
            }
            return !processed[item];
          }),
          commonParent;
        if (valid.length) {
          return false;
        } else {
          var validParents = Object.keys(processed).reverse();
          for (var i = 0; i < validParents.length; i++) {
            var dataKey = validParents[i],
                itemData = obj_format[dataKey];
            if (itemData.level < minLevel) {
              var hasAll = true;
              for(var j = 0; j < parent.length; j++){
                if(!__this.$node.isShapeConnected(itemData.id, parent[j])){
                  hasAll = false;
                  break;
                }
              }
              if (hasAll) {
                commonParent = dataKey;
                break;
              }
            }
          }
          return commonParent;
        }
      },
      left_sib = hgt_find( __cur.left_sibling ),
      right_sib = hgt_find( __cur.right_sibling ),
      left_child = ( is_other_vert ? hgt_find : wdt_find )( __cur.left_children ),
      right_child = ( is_other_vert ? hgt_find : wdt_find )( __cur.right_children ),
      direct_child = wdt_find( __cur.direct_children ),
      children_hgt = Math.max( left_child.height, right_child.height, direct_child.height ),
      sibling_hgt = Math.max( __height, left_sib.height, right_sib.height ),
      sib_hgt_to_move = vert_spacing + sibling_hgt,
      left_sib_width = left_sib.width,
      right_sib_width = right_sib.width,
      left_child_width = left_child.width,
      right_child_width = right_child.width,
      direct_child_width = direct_child.width,
      min_left = 0,
      min_top = 0,
      max_top = __height,
      max_left = __width,
      sib_left = 0,
      height_diff_due_to_sibling = 0;

      adjust_hgt( sibling_hgt, left_sib, void 0, true );
      adjust_hgt( sibling_hgt, right_sib, void 0, true );
      adjust_hgt( children_hgt, left_child, sib_hgt_to_move );
      adjust_hgt( children_hgt, right_child, sib_hgt_to_move );
      adjust_hgt( children_hgt, direct_child, sib_hgt_to_move );

      if( left_sib_width ){
          var __left_arr = left_sib.arr,
          ret1 = adjust_top( 'left', - left_sib_width - hori_spacing, __left_arr ),
          ret2 = adjust_top( 'top', ( __height - left_sib.height ) / 2, __left_arr );

          min_left = Math.min( min_left, ret1.min );
          min_top = Math.min( min_top, ret2.min );
          max_top = Math.max( max_top, ret2.max );
      }

      if( right_sib_width ){
          var __right_arr = right_sib.arr,
          ret1 = adjust_top( 'left', hori_spacing + __width, __right_arr ),
          ret2 = adjust_top( 'top', ( __height - right_sib.height ) / 2, __right_arr );

          max_left = Math.max( max_left, ret1.max );
          min_top = Math.min( min_top, ret2.min );
          max_top = Math.max( max_top, ret2.max );
      }

      height_diff_due_to_sibling = sibling_hgt - max_top;

      if( !height_diff_due_to_sibling && ( direct_child_width || left_child_width || right_child_width ) ){
          max_top += ( vert_spacing + children_hgt );
      }

      if( direct_child_width ){
          var __direct_arr = direct_child.arr,
          ret1,
          final_value,
          __direct_arr_len = __direct_arr.length;

          if( /*__data.ltPropIgnoreSibling &&*/ __direct_arr_len ){
             // var __min_value = Infinity,
             // __max_value = -Infinity,
             // __mid;

             // __direct_arr.forEach( function( item ){
             //    __min_value = Math.min( item.left, __min_value );
             //    __max_value = Math.max( __max_value, item.left + item.original_width );
             // });
            
            var mid_index = parseInt( __direct_arr_len / 2 );

             if( /*( align_mid_children || true ) &&*/ ( __direct_arr_len > 1 ) && ( __direct_arr_len % 2 == 1 ) ){
                var mid_shape = __direct_arr[ mid_index ],
                __mid = mid_shape.left + mid_shape.original_width / 2;

                final_value = __width / 2 - __mid;
             } else {
                var left_mid = __direct_arr[ mid_index ? ( mid_index - 1 ) : mid_index ],
                right_mid = __direct_arr[ mid_index ],
                __mid;

                if( __direct_arr_len == 1 ){
                  __mid = ( right_mid.left + right_mid.original_width - left_mid.left );
                  final_value = ( __width - __mid ) / 2 - left_mid.left;
                } else {
                  __mid = ( left_mid.left + left_mid.original_width + right_mid.left ) / 2;

                  final_value = __width / 2 - __mid;
                }
             }

          } else {
             final_value = ( __width - direct_child_width ) / 2;
          }

          ret1 = adjust_top( 'left', final_value, __direct_arr );

          min_left = Math.min( min_left, sib_left = Math.min( sib_left, ret1.min ) );
          max_left = Math.max( max_left, ret1.max );

          if( height_diff_due_to_sibling ){
            var __ret = adjust_top( 'top', - height_diff_due_to_sibling, __direct_arr );
            min_top = Math.min( min_top, __ret.min );
            max_top = Math.max( max_top, __ret.max );
          }
      }

      if( right_child_width ){
          var __right_arr = right_child.arr,
          ret1 = adjust_top( 'left', Math.max( sib_left + direct_child_width + hori_spacing, __width + hori_spacing ), __right_arr );
          max_left = Math.max( max_left, ret1.max );

          if( height_diff_due_to_sibling ){
            var to_deduct = height_diff_due_to_sibling + ( sibling_hgt - right_sib.height ) / 2,
            __ret = adjust_top( 'top', -to_deduct, __right_arr );
            min_top = Math.min( min_top, __ret.min );
            max_top = Math.max( max_top, __ret.max );
          }
      }

      if( left_child_width ){
          var __left_arr = left_child.arr;

          min_left = Math.min( min_left, adjust_top( 'left', sib_left - hori_spacing - left_child_width, __left_arr ).min );

          if( height_diff_due_to_sibling ){
            var to_deduct = height_diff_due_to_sibling + ( sibling_hgt - left_sib.height ) / 2,
            __ret = adjust_top( 'top', -to_deduct, __left_arr );

            min_top = Math.min( min_top, __ret.min );
            max_top = Math.max( max_top, __ret.max );
          }
      }

      var children_width = ( left_child_width + ( left_child_width ? hori_spacing : 0 ) + Math.max( direct_child_width, __width ) + ( right_child_width ? hori_spacing : 0 ) + right_child_width ),
      sibling_width = ( left_sib_width + ( left_sib_width ? hori_spacing : 0 ) + __width + ( right_sib_width ? hori_spacing : 0 ) + right_sib_width ),
      __final = {
        id : item,
        left : 0,
        top : 0,
        original_width : __width,
        original_height : __height,
        width : max_left - min_left,
        height : max_top - min_top,
        left_sib : left_sib.arr,
        right_sib : right_sib.arr,
        left_child : left_child.arr,
        right_child : right_child.arr,
        direct_child : direct_child.arr,
        min_left : min_left,
        min_top : min_top,
        max_left : max_left,
        commonHangingChildren : commonHangingChildren
      };

      // __cur.ret = ret;

      __this.nested_modify( __final, 'left', -min_left, is_downward );
      __this.nested_modify( __final, 'top', -min_top, is_downward );

      if(centerCommon){
        for (var commonChild in commonHangingChildren) {
          if (commonChild == item) {
  
            commonHangingChildren[commonChild].forEach(function (curChild) {
              // var XValue = { min: Infinity, max: -Infinity };
              // obj_format[curChild.id].to.forEach(function (actPar) {
              //   var actParLeft = __this.arrangeData[actPar].left,
              //     actParRight = actParLeft + obj_format[actPar].dimension.width;
              //   XValue.min = Math.min(XValue.min, actParRight);
              //   XValue.max = Math.max(XValue.max, actParLeft);
              // });
              // var centerAdjustX = ((XValue.min + XValue.max) / 2) - (curChild.left + obj_format[curChild.id].dimension.width / 2),
              var XValue = { min: Infinity, max: -Infinity },
                  parChildFit = {},
                  centerAdjustX;
              obj_format[curChild.id].to.every(function (actPar) {
                if(!parChildFit.first){
                  parChildFit.first = __this.$node.isShapeConnected(__final.direct_child[0].id,actPar);
                }
                if(!parChildFit.last){
                  parChildFit.last = __this.$node.isShapeConnected(__final.direct_child[__final.direct_child.length - 1].id, actPar);
                }
                if(parChildFit.first && parChildFit.last){
                  return false;
                }
                var actParMid = __this.arrangeData[actPar].left + obj_format[actPar].dimension.width / 2;
                XValue.min = Math.min(XValue.min, actParMid);
                XValue.max = Math.max(XValue.max, actParMid);
                return true;
              });

              if(parChildFit.first && parChildFit.last){
                centerAdjustX = (__final.left + __final.original_width / 2) - (curChild.left + curChild.original_width / 2);
                obj_format[curChild.id].commonParent = item;
              } else {
                centerAdjustX = ((XValue.min + XValue.max) / 2) - (curChild.left + curChild.original_width / 2);
              }


              var centerAdjustY = __final.min_top + __final.height + common_child_spacing;
                  // centerAdjustX = (__final.left + __final.original_width / 2) - (curChild.left + curChild.original_width / 2);
  
              __this.nested_modify(curChild, 'left', centerAdjustX, is_downward);
              __this.nested_modify(curChild, 'top', centerAdjustY, is_downward);

              obj_format[curChild.id].commonChild = true;
              obj_format[curChild.id].vertSpacing = curChild.vertSpacing = common_child_spacing;
              __final.direct_child.push(curChild);
              __final.height += curChild.height + common_child_spacing;
              __final.width = Math.max(__final.width, curChild.width);
              __final.min_left = Math.min(__final.min_left, curChild.min_left);
              __final.max_left = Math.max(__final.max_left, curChild.max_left);

            });

            __this.nested_modify( __final, 'left', -__final.min_left, is_downward );
            __this.nested_modify( __final, 'top', -__final.min_top, is_downward );
            delete __final.commonHangingChildren[commonChild];
          }
        }
      }

      return __final;
  },

  adjustSpacing: function (nodes, nodePosition, obj_format) {

    var alteredNodes = {},
      curInc = 0,
      commonChildUpd = {},
      chngData = {},
      moveLeft = false,
      centerVal = function (childNodes, commonchild) {
        if (commonchild) {
          var commonParent = obj_format[commonchild].commonParent,
              XValue = { min: Infinity, max: -Infinity };
          if(commonParent){
            return nodePosition[commonParent].position.left + nodePosition[commonParent].dimension.width / 2;
          }
          childNodes.forEach(function (actPar) {
            var actParData = nodePosition[actPar],
              actParMid = actParData.position.left + actParData.dimension.width / 2;
            XValue.min = Math.min(XValue.min, actParMid);
            XValue.max = Math.max(XValue.max, actParMid);
          });
          return (XValue.min + XValue.max) / 2;
        } else {
          var centerInd = childNodes.length / 2 - 1,
            leftMidChild = nodePosition[childNodes[centerInd]];

          return (leftMidChild.position.left + leftMidChild.dimension.width + nodePosition[childNodes[centerInd + 1]].position.left) / 2;
        }
      },
      changePos = function (node, inc) {
        if (!alteredNodes[node]) {
          var isNeg;
          if (inc == undefined) {
            isNeg = moveLeft;
            inc = curInc;
          }
          var curData = nodePosition[node],
              chng = (inc * (isNeg ? -1 : 1));
          alteredNodes[node] = true;
          curData.position.left += chng;
          chngData[node] = chngData[node] ? chngData[node] + chng : chng;
          return true;
        }
      },
      adjustChildren = function (node, inc, avoidCurrent) {
        (avoidCurrent || !(obj_format[node].commonChild && (commonChildUpd[node] = true))) && changePos(node, inc) && obj_format[node].from.forEach(function (child) {
          adjustChildren(child, inc);
        });
      },
      adjustParent = function (node, xinc, avoidDirection) {
        var parentNode = obj_format[node].to[0];
        if (parentNode) {
          if (obj_format[node].commonChild) {
            obj_format[node].to.forEach(function (parent) {
              changePos(parent) && adjustParent(parent, undefined, true);//without avoidDirection, when moveLeft situation, i will be -1(0 - 1), fails
            });
          } else {
            var parentData = nodePosition[parentNode],
              childNodes = obj_format[parentNode].from,
              childLen = childNodes.length;

            if (childLen > 1) {
              if (moveLeft && !avoidDirection) {
                for (var i = childNodes.indexOf(node) - 1; i >= 0; i--) {
                  adjustChildren(childNodes[i]);
                }
              } else {
                for (var i = childNodes.indexOf(node) + 1; i < childLen; i++) {
                  adjustChildren(childNodes[i]);
                }
              }
              var parentCenterVal = parentData.position.left + parentData.dimension.width / 2,
                childCenterVal;
              if (childLen % 2) {
                var childNodeVal = nodePosition[childNodes[parseInt(childLen / 2)]];
                childCenterVal = childNodeVal.position.left + childNodeVal.dimension.width / 2;
              } else {
                childCenterVal = centerVal(childNodes);
              }
              xinc = childCenterVal - parentCenterVal;
            }
            changePos(parentNode, xinc) && adjustParent(parentNode, xinc);
          }
        }
      },
      adjustCommonChild = function () {
        var commonChilds = Object.keys(commonChildUpd);
        for (var i = 0; i < commonChilds.length; i++) {
          var child = commonChilds[i],
            parCenterVal = centerVal(obj_format[child].to, child),
            childData = nodePosition[child],
            childChng = parCenterVal - (childData.position.left + childData.dimension.width / 2);
          adjustChildren(child, childChng, true);
          delete commonChildUpd[child];
        }
        Object.keys(commonChildUpd).length && adjustCommonChild();
      };


    for (var altNode in nodes) {
      curInc = nodes[altNode].inc;
      moveLeft = nodes[altNode].moveLeft;
      if (!isNaN(curInc) && curInc) {
        adjustChildren(altNode);
        adjustParent(altNode);
      }
      alteredNodes = {};
    }
    adjustCommonChild();
    return chngData;
  },

  updateLoopConnections: function (nodePositions, obj_form) {//only single chain connections are supported for now
    var xtra = this.data.ltPropLoopConnectionSpacing,
      isInSeries = function (par, child) {
        return this.$node.isShapeConnected(par, child);
      }.bind(this),
      getNewValue = function (oldVal, newVal, getMax) {
        return getMax ? Math.max(oldVal, newVal) : Math.min(oldVal, newVal)
      },
      getOverallWidth = function (src, target, getMax, left) {
        var minLeft = getMax ? -Infinity : Infinity,
          parConnections = this.getConnections(src).target,
          minLeftElem,
          modLeftValue = left == undefined ? (getMax ? minLeft : nodePositions[src.id].position.left) : left;
        for (var i = 0; i < parConnections.length; i++) {
          var item = parConnections[i],
            connElem = $L(item.connection_elem);
          if (connElem.hasClass('lyteLoopConnection')/* || connElem.data('options').avoidArrange*/) {
            continue;
          }
          var itemData = nodePositions[item.src.id],
            srcLeft = itemData.position.left + (getMax ? itemData.dimension.width : 0);
          if (item.src.id == target) {
            return getNewValue(modLeftValue, srcLeft, getMax);
          }
          if (isInSeries(target, item.src)) {
            if (getMax ? srcLeft > minLeft : srcLeft < minLeft) {
              minLeft = srcLeft;
              minLeftElem = item.src;
            }
          }
        };
        if (minLeftElem) {
          return getOverallWidth(minLeftElem, target, getMax, getNewValue(modLeftValue, minLeft, getMax));
        }
        return;
      }.bind(this),
      getModifier = function (data) {
        var connnData = $L(data.conn).data(),
          srcId = data.src,
          targetId = data.trg,
          srcData = nodePositions[srcId],
          targetData = nodePositions[targetId],
          modifier = [];

        if (!data.rightSide) {//left side
          if (!isInSeries(targetId, srcId)) {
            return;
          }
          var minLeftValue = getOverallWidth(connnData.src[0], targetId);
          if (minLeftValue == undefined) {
            return;
          }
          modifier = [minLeftValue - srcData.position.left - xtra];
        } else {
          var maxRightValue = getOverallWidth(connnData.target[0], srcId, true);
          if (maxRightValue == undefined) {
            return;
          }
          modifier = [maxRightValue + xtra - (srcData.position.left + srcData.dimension.width)];

          if (srcData.id != targetId && connnData.src_position.x == 1) {
            var trgVertSpacing = obj_form[targetId].vertSpacing,
              trgPos;
            if (trgVertSpacing == undefined) {
              return;
            }
            modifier.push(data.height);
            if (maxRightValue < (targetData.position.left + targetData.dimension.width / 2)) {
              modifier.push(-srcData.dimension.width / 2);
              trgPos = { x: 0, y: 0.5 };
            } else {
              trgPos = { x: 0.5, y: 0 };
            }
            connnData.options.target_position = trgPos;
          }
        }
        return modifier;
      }.bind(this),
      getDistance = function (curX, prevX, rightSide, shapeOverlap) {
        var dist = Math.abs(curX - prevX);
        if (!shapeOverlap && dist >= xtra) {
          dist = 0;
        } else if (rightSide ? curX < prevX : curX > prevX) {
          dist += xtra;
        } else if (shapeOverlap && dist > xtra) {
          dist = 0;
        } else {
          dist = xtra - dist;
        }
        return dist;
      },
      getXPos = function (node, rightSide) {
        var nodeData = nodePositions[node];
        return nodeData.position.left + (rightSide ? nodeData.dimension.width : 0);
      },
      getChainRoot = function (node, right, prevLeft) {
        var childConn = node.data('connection_elements'),
          parent = { value: right ? -Infinity : Infinity },
          child = { value: right ? Infinity : -Infinity };
        for (var key in childConn) {
          var conn = childConn[key].connector,
            curNode, curLeft;
          if (!conn.hasClass('lyteLoopConnection')) {
            if (/^target/i.test(key)) {
              curNode = conn.data('src');
              curLeft = nodePositions[curNode[0].id].position.left;
              if (right ? curLeft > parent.value : curLeft < parent.value) {
                parent.value = curLeft;
                parent.node = curNode;
              }
            } else if (prevLeft != undefined) {
              curNode = conn.data('target');
              curLeft = nodePositions[curNode[0].id].position.left;
              if (right ? curLeft > prevLeft && curLeft < child.value : curLeft < prevLeft && curLeft > child.value) {
                child.value = curLeft;
                child.node = curNode;
              }
            }
          }
        }
        if (child.node && child.node[0]) {
          return child.node;
        }
        if (parent.node && parent.node[0]) {
          return getChainRoot(parent.node, right, nodePositions[node[0].id].position.left);
        }
        return undefined;
      }.bind(this),
      getChainNearValue = function (node, right, prevLeft, maxValue) {
        var childConn = node.data('connection_elements'),
          curNearValue = { value: right ? Infinity : -Infinity },
          nodeBcr = nodePositions[node[0].id];
        maxValue = maxValue == undefined ? nodeBcr.position.left + (right ? 0 : nodeBcr.dimension.width) : maxValue;
        for (var key in childConn) {
          var conn = childConn[key].connector,
            curNode, curLeft;
          if (!conn.hasClass('lyteLoopConnection')) {
            if (/^src/i.test(key)) {
              curNode = conn.data('target');
              curLeft = nodePositions[curNode[0].id].position.left;
              if (right ? curLeft < curNearValue.value : curLeft > curNearValue.value) {
                curNearValue.value = curLeft;
                curNearValue.node = curNode;
              }
            } else if (prevLeft != undefined) {
              curNode = conn.data('src');
              curLeft = nodePositions[curNode[0].id].position.left;
              if (right ? curLeft < prevLeft : curLeft > prevLeft) {
                return maxValue;
              }
            }
          }
        }

        var curNodeValue = nodeBcr.position.left + (right ? 0 : nodeBcr.dimension.width),
            closestValue = right ? Math.min(maxValue, curNodeValue) : Math.max(maxValue, curNodeValue);//prevNode is cal, because commonChild wont be included
        if (curNearValue.node && curNearValue.node[0]) {
          return getChainNearValue(curNearValue.node, right, nodePositions[node[0].id].position.left, closestValue);
        }
        
        return closestValue;
      }.bind(this),
      checkItemOverlap = function (item, modifier, chainRoot) {
        var rightConnections = item.rightSide,
          nearestPoint = chainRoot && getChainNearValue(chainRoot, rightConnections);
        if (nearestPoint != undefined) {
          var itemLeft = getXPos(item.src, rightConnections) + modifier,
            overlapDist = getDistance(nearestPoint, itemLeft, rightConnections, true);
          if (overlapDist) {
            moveNodes({ [chainRoot[0].id]: { inc: overlapDist, moveLeft: !rightConnections } });
          }
        }
      },
      updModifier = function (item, modifier, prevItem, rightConnections, chainRoot) {
        var curItemXPos = getXPos(item.src, rightConnections),
          itemEffectiveX = curItemXPos + modifier[0],
          prevItemEffectiveX = getXPos(prevItem.src, prevItem.rightSide) + prevItem.modifier[0],
          xDistance = getDistance(itemEffectiveX, prevItemEffectiveX, rightConnections);

        if (xDistance) {
          var itemYMin = Math.min(item.yPos.src, item.yPos.target),
            itemYMax = Math.max(item.yPos.src, item.yPos.target),

            prevItemYMin = Math.min(prevItem.yPos.src, prevItem.yPos.target),
            prevItemYMax = Math.max(prevItem.yPos.src, prevItem.yPos.target),

            yOverlap = !(itemYMax < prevItemYMin || itemYMin > prevItemYMax);

          if (yOverlap) {
            if (rightConnections == prevItem.rightSide) {
              modifier[0] += xDistance * (rightConnections ? 1 : -1);
              checkItemOverlap(item, modifier[0], chainRoot);
            } else {
              moveNodes({ [chainRoot[0].id]: { inc: xDistance, moveLeft: !rightConnections } });
            }
          }
        }
      }.bind(this),
      moveNodes = function (adjustNodes) {
        var chngData = this.adjustSpacing(adjustNodes, nodePositions, obj_form);
        return chngData;
      }.bind(this),
      newUpd = [];

    Array.from($L('.lyteLoopConnection', this.__wrapper)).forEach(function (item) {
      var connDetails = $L(item).data(),
        srcId = connDetails.src[0].id,
        targetId = connDetails.target[0].id,
        srcData = nodePositions[srcId],
        targetData = nodePositions[targetId],
        trgPos = connDetails.target_position || {},
        yPos = { src: srcData.position.top + srcData.dimension.height * connDetails.src_position.y, target: targetData.position.top + targetData.dimension.height * trgPos.y },
        connData = { src: srcId, conn: item, trg: targetId, yPos: yPos, height: Math.abs(yPos.src - yPos.target) };

      if (connDetails.src_position.x == 1) {//right side
        if (srcData.id != targetId && connDetails.src_position.x == 1) {//three way connector
          connData.height = (targetData.position.top - obj_form[targetId].vertSpacing / 2) - (srcData.position.top + (srcData.dimension.height * connDetails.src_position.y));
          connData.yPos.target = yPos.src + connData.height;
        }
        connData.rightSide = true;
      }
      newUpd.push(connData);

    }.bind(this));

    newUpd = newUpd.sort(function (a, b) {
      return a.height - b.height;
    });

    newUpd.forEach(function (item, index) {
      var modifier = getModifier(item),
        rightConnections = item.rightSide,
        mainNode = rightConnections ? item.src : item.trg,
        chainRoot = getChainRoot($L(this.getItem(mainNode)), rightConnections),
        otherSideItems = [];

      checkItemOverlap(item, modifier[0], chainRoot);
      for (var i = 0; i < index; i++) {
        var prevItem = newUpd[i];
        if (prevItem.rightSide == rightConnections) {
          updModifier(item, modifier, prevItem, rightConnections, chainRoot);
        } else {
          otherSideItems.push(prevItem);
        }
      }
      otherSideItems.forEach(function (prevItem) {
        updModifier(item, modifier, prevItem, rightConnections, chainRoot);
      });
      item.modifier = modifier;
    }.bind(this));

    newUpd.forEach(function (item) {//need to update modifier[2]
      var connnData = $L(item.conn).data();
      connnData.options.modifiers = item.modifier;
      this.$node.updateIndividualConnection(item.conn);
    }.bind(this));

  },

  sibling_arrange : function( obj_format, dimension, frm_didConnect ){
      var level_arr = {},
      to_move = {},
      seperate_shapes = [],
      connected_shapes = [],
      is_render_with_arrange = frm_didConnect && this.data.ltPropRenderWithArrange,
      leveledArray = {},
      arrangeLevels = this.data.ltPropFixedArrangeLevels,
      cb = "onArrange";

      arrangeLevels && (leveledArray = this.setLevels( obj_format ));

      this.find_sibling( obj_format, connected_shapes, seperate_shapes, is_render_with_arrange );
      
      if(arrangeLevels && leveledArray){
        connected_shapes = leveledArray.connected;
        seperate_shapes = leveledArray.seperate;
      }

      this.set_final_positions( obj_format, connected_shapes, seperate_shapes, to_move );

      this.data.ltPropCenterCommonItems && this.data.ltPropIgnoreSibling && this.updateLoopConnections(to_move, obj_format);

      this.set_positions( to_move, dimension, frm_didConnect, is_render_with_arrange, obj_format );

      if (arrangeLevels) {
        var fastdom = $L.fastdom;
        fastdom.measure(function () {
          fastdom.mutate(function () {
            this.setConnections(leveledArray, to_move, obj_format);//conections made after all shapes are positioned
          }.bind(this));
        }.bind(this));
      }

      this.getMethods( cb ) && this.executeMethod( cb, to_move, !!frm_didConnect, this.$node, obj_format );
   }
});