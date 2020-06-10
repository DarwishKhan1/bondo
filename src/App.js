import React from 'react';
import './App.css';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SidebarComponent from './Components/sidebar/SidebarComponent';
import HeaderComponent from './Components/header/HeaderComponent';
import VerificationComponent from './Components/Verifications/Verification';
import DashboardComponent from './Components/Dashboard/Dashboard';
import NotesComponent from './Components/Notes/notes';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    minHeight: '100vh'
  },
  content: {
    marginTop: 20,
  },
  mainBlock: {
    backgroundColor: '#F7F8FC',
    padding: 30
  }
});

class App extends React.Component {

  state = {
    selectedItem: 'Dashboard'
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => this.forceUpdate();

  render() {
    const { selectedItem } = this.state;
    return (
      <Router>
        <Row className={css(styles.container)}>
          <SidebarComponent selectedItem={selectedItem} onChange={(selectedItem) => this.setState({ selectedItem })} />
          <Column flexGrow={1} className={css(styles.mainBlock)}>
            <HeaderComponent title={selectedItem} />
            <div className={css(styles.content)}>
              <Switch>
                <Route exact path="/" component={DashboardComponent} />
                <Route exact path="/verification" component={VerificationComponent} />
                <Route exact path="/notes" component={NotesComponent} />
              </Switch>
            </div>
          </Column>
        </Row>
      </Router>
    )
  }
}

export default App;
