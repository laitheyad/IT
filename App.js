import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import gpaCalculator from './screen/gpaCalculator';
import SubjectNavigator from './src/subjects/main';
import Profile from './src/user/profile';
import CustomDrawer from './common/components/CustomDrawer';

const MainNavigator = createDrawerNavigator({
  User:{
    screen:Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'الصفحة الشخصية',
    }),
  },
  subjectsList:{
    screen:SubjectNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'المواد كافة',
    }),
  },
  GPACalculator:{
    screen:gpaCalculator,
    navigationOptions: ({ navigation }) => ({
      title: 'حساب المعدل',
      
    }),
  },
  
},{
  initialRouteName:'subjectsList',
  drawerPosition:'right',
  contentComponent: CustomDrawer,
  drawerType:'slide'
})

const App = createAppContainer(MainNavigator);

export default App;