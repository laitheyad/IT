import { createStackNavigator } from 'react-navigation-stack';
import SubjectsList from './subjectsList';
import SubjectDetailView from './subject_detail';

const SubjectNavigator = createStackNavigator({
  subjectsList:{
    screen:SubjectsList
  },
  subject_detail:{
    screen:SubjectDetailView
  }
},
{
    defaultNavigationOptions:{
        headerShown:false,
        gestureEnabled:true,
    }
})

export default SubjectNavigator;