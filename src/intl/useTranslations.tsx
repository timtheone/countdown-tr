import IntlMessageFormat from 'intl-messageformat';
import {useContext, ReactNode} from 'react';
import IntlContext from './IntlContext';
import {MessageSegment} from './Messages';


export default function useTranslations(componentName: string) {
  const context = useContext(IntlContext);
  if (!context) throw new Error('Please provide the intl context.');

  const {locale, messages} = context;

  function translate(
    /** Use a dot to indicate a level of nesting (e.g. `namespace.nestedLabel`). */
    idPath: string,
    opts: {values?: Record<string, string | number | Date> | ReactNode} = {}
  ): string {
    try {
      let message: MessageSegment = messages[componentName];
      idPath.split('.').forEach((part) => {
        const next = (message as any)[part];

        if (!part || !next) {
          throw new Error(
            `No message found for \`${idPath}\` in \`${componentName}\`.`
          );
        }

        message = next;
      });

      if (typeof message === 'object') {
        throw new Error(
          `Insufficient path specified for \`${idPath}\` in \`${componentName}\`.`
        );
      }

      const messageFormat = new IntlMessageFormat(message, locale);
      // @ts-ignore
      const formattedMessage: string = messageFormat.format(opts.values);
      if (formattedMessage === undefined) {
        throw new Error(`Unable to format ${message} with ${messageFormat}`);
      }

      return formattedMessage;
    } catch (error) {
      console.error(error);
      return [componentName, idPath].join('.');
    }
  }

  return translate;
}
