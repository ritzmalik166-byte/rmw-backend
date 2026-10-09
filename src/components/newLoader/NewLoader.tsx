'use client';

import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.loader}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  loader: {
    width: '64px',
    height: '64px',
    border: '6px solid #007bff',
    borderTop: '6px solid transparent',
    borderRadius: '50%',
  },
};

export default Loader;
