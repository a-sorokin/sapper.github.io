import React from 'react';
import './App.css';
import { Logo } from 'components/Logo/Logo';
import { GridSizeSelector } from 'components/GridSizeSelector/GridSizeSelector';
import { useGridStore } from 'store/store';
import { Grid } from 'components/Grid/Grid';
import { Restart } from 'components/Restart/Restart';
import { ChangeField } from 'components/ChangeField/ChangeField';

function App() {
  const isInitialized = useGridStore(state => state.isInitialized);

  return (
    <div className="App">
      {isInitialized ? (
        <>
          <Grid />
          <Restart />
          <ChangeField />
        </>
      ) : (
        <>
          <Logo />
          <GridSizeSelector />
        </>
      )}
    </div>
  );
}

export default App;
