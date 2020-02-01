import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import gpaCalculator from './screen/gpaCalculator';
import SubjectNavigator from './src/subjects/main';
import Profile from './src/user/profile';

const MainNavigator = createDrawerNavigator({
  subjectsList:{
    screen:SubjectNavigator
  },
  GPACalculator:{
    screen:gpaCalculator
  },
  User:{
    screen:Profile
  }
})

const App = createAppContainer(MainNavigator);

export default App;