/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ListView,
  Share,
  NativeModules
} from 'react-native';

const { ContactModule } = NativeModules;

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => {
    return r1 !== r2
  }
})

export default class nativeModuleTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listItems: ds.cloneWithRows([])
    }

    this.renderItem = (item) => {
      return (
        <TouchableOpacity onPress={() => this.shareThis(item)} style={styles.listItem}>
          <Text style={styles.listItemName}>{item.name}</Text>
          <Text style={styles.listItemPhone}>Phone: {item.phone}</Text>
        </TouchableOpacity>
      )
    }
  }

  shareThis(item) {
    // item.url = 'http://facebook.github.io/react-native/'
    item.message = item.name + ' ' + item.phone
    Promise.resolve(Share.share(item), {
      dialogTitle: 'Share this contact...',
    })
  }

  componentDidMount() {
    this.doSearch('')
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TextInput onChangeText={(data) => this.doSearch(data)} />
        <ListView enableEmptySections renderRow={data => this.renderItem(data)} dataSource={ this.state.listItems } />
      </View>
    );
  }

  doSearch(query) {
    const results = []

    if (typeof query === 'undefined') {
      query = ''
    }

    this.getContacts(query).then(listItems => {
      const parsedItem = JSON.parse(listItems)
      parsedItem.map(item => {
        results.push({
          name: item.name,
          phone: item.phone,
          email: item.email,
        })
      })
      this.setState({ listItems: ds.cloneWithRows(results) })
    }).catch(err => console.log(err))
  }

  getContacts(searchQuery) {
    if (typeof searchQuery === 'undefined') {
      searchQuery = ''
    }

    return ContactModule.getContacts(searchQuery)
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 16,
  },
  listItemName: {
    fontSize: 20,
  },
  listItemPhone: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nativeModuleTest', () => nativeModuleTest);
