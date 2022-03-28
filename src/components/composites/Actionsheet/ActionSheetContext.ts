import React from 'react';

export const ActionSheetContext = React.createContext({
  hideDragIndicator: false,
  handleClose: (() => {}) as any,
});
