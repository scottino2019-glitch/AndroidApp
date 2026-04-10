import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOS } from '../../OSContext';
import { APPS } from './HomeScreen';
import BrowserApp from '../../apps/BrowserApp';

export default function AppContainer() {
  const { activeAppId } = useOS();
  const activeApp = APPS.find(a => a.id === activeAppId);

  return (
    <AnimatePresence>
      {activeApp && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute inset-0 z-40 bg-white overflow-hidden flex flex-col"
        >
          {activeApp.component ? (
            <activeApp.component />
          ) : activeApp.externalUrl ? (
            <BrowserApp url={activeApp.externalUrl} />
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
