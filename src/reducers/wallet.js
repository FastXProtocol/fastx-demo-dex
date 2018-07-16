const GENERATE_WALLET = 'GENERATE_WALLET'
const GENERATE_WALLET_SUCCESS = 'GENERATE_WALLET_SUCCESS'
const GENERATE_WALLET_ERROR = 'GENERATE_WALLET_ERROR'
const GENERATE_WALLET_CANCEL = 'GENERATE_WALLET_CANCEL'
const GENERATE_KEYSTORE = 'GENERATE_KEYSTORE'
const GENERATE_KEYSTORE_SUCCESS = 'GENERATE_KEYSTORE_SUCCESS'
const GENERATE_KEYSTORE_ERROR = 'GENERATE_KEYSTORE_ERROR'
const TIP_MSG_CANCEL = 'TIP_MSG_CANCEL'
const SAVE_WALLET = 'SAVE_WALLET'
const SAVE_WALLET_SUCCESS = 'SAVE_WALLET_SUCCESS'
const SAVE_WALLET_ERROR = 'SAVE_WALLET_ERROR'
const SAVE_KS = 'SAVE_KS'
const LOAD_WALLET_SUCCESS = 'LOAD_WALLET_SUCCESS'
const LOAD_WALLET_ERROR = 'LOAD_WALLET_ERROR'
const SHOW_RESTORE_WALLET = 'SHOW_RESTORE_WALLET'
const CHANGE_USER_SEED = 'CHANGE_USER_SEED'
const CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD'
const RESTORE_WALLET_FROM_SEED = 'RESTORE_WALLET_FROM_SEED'
const RESTORE_WALLET_FROM_SEED_ERROR = 'RESTORE_WALLET_FROM_SEED_ERROR'
const RESTORE_WALLET_FROM_SEED_SUCCESS = 'RESTORE_WALLET_FROM_SEED_SUCCESS'
const RESTORE_WALLET_CANCEL = 'RESTORE_WALLET_CANCEL'
const CLOSE_WALLET = 'CLOSE_WALLET'

const initialState = {
    keystore: false,
    ks: false,
    isShowTipMessage: true,
    isShowGenerateWallet: false,
    generateWalletLoading: false,  // generate new seed and password
    generateWalletError: false,
    password: false,
    seed: false,
    generateKeystoreLoading: false,
    generateKeystoreError: false,
    isComfirmed: false,
    addressList: false,
    addressListLoading: false, // for addressList loading and error
    addressListError: false,
    addressListMsg: false,
    saveWalletLoading: false,
    saveWalletError: false,
    loadWalletLoading: false,
    loadWalletError: false,
    isShowRestoreWallet: false,
    restoreWalletError: false,
    userSeed: '',
    userPassword: '',
};

export default function wallet (state = initialState, action = {}) {
  switch (action.type) {
    case TIP_MSG_CANCEL:
        return {
          ...state,
          isShowTipMessage: false
        };
    case GENERATE_WALLET:
        return {
          ...state,
          isShowGenerateWallet: true,
          generateWalletLoading: true,
          generateWalletError: false
        };
    case GENERATE_WALLET_SUCCESS:
        return {
          ...state,
          generateWalletLoading: false,
          seed: action.seed,
          password: action.password
        };
    case GENERATE_WALLET_ERROR:
        return {
          ...state,
          generateWalletLoading: false,
          generateWalletError: true
        };
    case GENERATE_WALLET_CANCEL:
        return {
          ...state,
          isShowGenerateWallet: false,
          generateWalletLoading: true,
          generateWalletError: false,
          password: false,
          seed: false
        };
    case GENERATE_KEYSTORE:
        return {
          ...state,
          isShowGenerateWallet: false,
          generateKeystoreLoading: true,
          generateKeystoreError: false
        };
    case GENERATE_KEYSTORE_SUCCESS:
        return {
            ...state,
            keystore: action.keystore,
            seed: false,
            isComfirmed: true,
            addressListError: false,
            addressList: action.addressMap,
            generateKeystoreLoading: false
        };
    case GENERATE_KEYSTORE_ERROR:
        return {
            ...state,
            generateKeystoreLoading: false,
            generateKeystoreError: action.error,
            isComfirmed: false
        }
    case SAVE_WALLET:
        return {
            ...state,
            saveWalletLoading: true,
            saveWalletError: false
        }
    case SAVE_WALLET_SUCCESS:
        return {
            ...state,
            saveWalletLoading: false
        }
    case SAVE_WALLET_ERROR:
        return {
            ...state,
            saveWalletLoading: false,
            saveWalletError: action.error
        }
    case SAVE_KS:
        return {
            ...state,
            ks : action.ks
        }
    case LOAD_WALLET_SUCCESS:
        return {
            ...state,
            loadWalletLoading: true,
            loadWalletError: false
        }
    case LOAD_WALLET_ERROR:
        return {
            ...state,
            loadWalletLoading: true,
            loadWalletError: action.error
        }
    case SHOW_RESTORE_WALLET:
        return {
            ...state,
            isShowRestoreWallet: true,
            seed: false,
            userSeed: ''
        }
    case RESTORE_WALLET_CANCEL:
        return {
            ...state,
            isShowRestoreWallet: false,
            userPassword: '',
            userSeed: '',
            restoreWalletError: false
        }
    case CHANGE_USER_SEED:
        return {
            ...state,
            userSeed: action.userSeed
        }
    case CHANGE_USER_PASSWORD:
        return {
            ...state,
            userPassword: action.password
        }
    case RESTORE_WALLET_FROM_SEED:
        return {
            ...state,
            restoreWalletError: false,
            isComfirmed: false
        }
    case RESTORE_WALLET_FROM_SEED_ERROR:
        return {
            ...state,
            restoreWalletError: action.error
        }
    case RESTORE_WALLET_FROM_SEED_SUCCESS:
        return {
            ...state,
            isShowRestoreWallet: false,
            seed: action.userSeed,
            password: action.userPassword,
            userSeed: '',
            userPassword: ''
        }
    case CLOSE_WALLET:
        return initialState
    default:
      return state;
  }
}
