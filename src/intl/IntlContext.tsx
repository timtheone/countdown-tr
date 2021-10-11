import {createContext} from 'react';
import Messages from './Messages';

const IntlContext = createContext<{
  locale: string;
  messages: Messages;
} | null>(null);

export default IntlContext;
