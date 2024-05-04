import { createStore } from 'redux'
import rootReducer from "./reducers";

const store = createStore(rootReducer) // Создание хранилища Redux с передачей корневого редуктора

export default store // Экспорт созданного хранилища по умолчанию