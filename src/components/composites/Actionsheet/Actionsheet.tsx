import React, { memo, forwardRef } from 'react';
import { Modal as ReactNativeModal, TouchableWithoutFeedback, Animated, StyleSheet, View } from 'react-native';
import type { IActionsheetProps } from './types';
import { usePropsResolution } from '../../../hooks';
import { ActionSheetContext } from './ActionSheetContext';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const Actionsheet = (
  { children, hideDragIndicator = false, ...props }: IActionsheetProps,
  ref: any
) => {
  const {
    isOpen,
    disableOverlay,
    onClose,
    ...resolvedProps
  } = usePropsResolution('Actionsheet', props);

  const styles = StyleSheet.create({
    backdrop: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "red",
      opacity: 0,
    },
    content: {
      flex: 1,
      justifyContent: 'flex-end',
      bottom: 40
    },
  });

  const backdropAnimatedStyle = {
    opacity: 0.4,
  };

  //TODO: refactor for responsive prop
  if (useHasResponsiveProps(props)) {
    return null;
  }
  return (
    <ReactNativeModal
        transparent
        animationType="none"
        visible={isOpen}
        {...resolvedProps}
    >
      <View 
        style={[
          styles.content,
        ]}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              styles.backdrop,
              backdropAnimatedStyle,
            ]}
          />
        </TouchableWithoutFeedback>

        <ActionSheetContext.Provider value={{ hideDragIndicator:false, handleClose: onClose }} >
          {children}
        </ActionSheetContext.Provider>

      </View>
      
    </ReactNativeModal>
    
  );
};

export default memo(forwardRef(Actionsheet));
