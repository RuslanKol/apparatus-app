const defaults = {
  color: '#142438',
  backgroundColor: '#fff',
  boxShadow: 'none',

  size4: '0.25rem',
  size8: '0.5rem',
  size10: '0.625rem',
  size12: '0.75rem',
  size14: '0.875rem',
  size16: '1rem',
  size24: '1.5rem',
  size32: '2rem',
  size40: '2.5rem',
  size48: '3rem',
  size56: '3.5rem',
  size64: '4rem',

  alertSuccessBg: '#D3F3CC',
  alertSuccessColor: '#496644',
  alertSuccessBorder: 'rgba(83,113,78,0.3)',

  alertErrorBg: '#F2BFBC',
  alertErrorColor: '#BA151B',
  alertErrorBorder: 'rgba(186,21,27,0.3)',

  alertInfoBg: '#BFE5F6',
  alertInfoColor: '#2473AB',
  alertInfoBorder: 'rgba(36,115,171,0.3)',

  alertWarningBg: '#FFF4E4',
  alertWarningColor: '#916617',
  alertWarningBorder: 'rgba(145,102,23,0.3)'
};

export default {
  Containers: {
    DefaultStyle: {
      width: '376px',
      padding: 0,
      marginRight: 0,
      height: 'auto'
    },
    br: {
      top: 'auto',
      bottom: defaults.size64,
      left: 'auto',
      right: defaults.size64
    }
  },
  MessageWrapper: {
    DefaultStyle: {
      padding: 0,
      margin: `0 ${defaults.size8} 0 0`
    }
  },
  Dismiss: {
    DefaultStyle: {
      backgroundColor: 'transparent',
      fontSize: defaults.size16,
      lineHeight: defaults.size16,
      height: defaults.size16,
      width: defaults.size16,
      fontFamily: 'inherit',
      top: `calc(50% - ${defaults.size8})`,
      right: defaults.size24,
      opacity: 0.6
    },

    success: {
      color: defaults.alertSuccessColor
    },

    error: {
      color: defaults.alertErrorColor
    },

    warning: {
      color: defaults.alertWarningColor
    },

    info: {
      color: defaults.alertInfoColor
    }
  },
  Title: {
    DefaultStyle: {
      fontSize: defaults.size14,
      margin: `${defaults.size4} ${defaults.size8} ${defaults.size4} 0`,
      padding: 0,
      fontWeight: 'bold'
    },

    success: {
      color: defaults.alertSuccessColor
    },

    error: {
      color: defaults.alertErrorColor
    },

    warning: {
      color: defaults.alertWarningColor
    },

    info: {
      color: defaults.alertInfoColor
    }
  },
  NotificationItem: {
    DefaultStyle: {
      fontSize: defaults.size14,
      lineHeight: 'normal',
      fontFamily: defaults.fontFamilyBase,
      borderRadius: defaults.borderRadiusBase,
      borderWidth: '1px',
      borderStyle: 'solid',
      display: 'flex',
      alignItems: 'center',
      margin: `${defaults.size16} 0px 0px`,
      padding: `${defaults.size16} ${defaults.size24}`,
      WebkitBoxShadow: defaults.boxShadow,
      MozBoxShadow: defaults.boxShadow,
      boxShadow: defaults.boxShadow,
      flexWrap: 'wrap'
    },
    success: {
      borderColor: defaults.alertSuccessBorder,
      color: defaults.alertSuccessColor,
      backgroundColor: defaults.alertSuccessBg
    },
    error: {
      borderColor: defaults.alertErrorBorder,
      color: defaults.alertErrorColor,
      backgroundColor: defaults.alertErrorBg
    },
    warning: {
      borderColor: defaults.alertWarningBorder,
      color: defaults.alertWarningColor,
      backgroundColor: defaults.alertWarningBg
    },
    info: {
      borderColor: defaults.alertInfoBorder,
      color: defaults.alertInfoColor,
      backgroundColor: defaults.alertInfoBg
    }
  },
  Action: {
    DefaultStyle: {
      background: defaults.backgroundColor,
      borderRadius: `${defaults.size8}`,
      padding: `${defaults.size8} ${defaults.size24}`,
      fontWeight: 'bold',
      margin: `${defaults.size8} 0`,
      border: 0
    },
    success: {
      backgroundColor: defaults.alertSuccessColor
    },
    error: {
      backgroundColor: defaults.alertErrorColor
    },
    warning: {
      backgroundColor: defaults.alertWarningColor
    },
    info: {
      backgroundColor: defaults.alertInfoColor
    }
  }
};
