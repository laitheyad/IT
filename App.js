import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import gpaCalculator from './screen/gpaCalculator';
import SubjectNavigator from './src/subjects/main';

const MainNavigator = createDrawerNavigator({
  subjectsList:{
    screen:SubjectNavigator
  },
  GPACalculator:{
    screen:gpaCalculator
  },
})

const App = createAppContainer(MainNavigator);

export default App;