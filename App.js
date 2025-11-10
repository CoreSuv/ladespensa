import * as RN from 'react-native';
import Navigation from "./src/Navigation";

export default function App() {
  return (
    <RN.View style={styles.app}>
      <Navigation />
    </RN.View>
  );
}


const styles = RN.StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
});

