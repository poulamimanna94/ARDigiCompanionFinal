import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {connect} from 'react-redux';
import AllActions from '../redux/AllActions';

const CustomSearchBar = props => {
  
  const allAssetInSection = props.allAssetInSection;
  const [itemArray, setItemArray] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => {
    setSearchQuery(query);
    setItemArray([]);

    if (query.length === 0) {
      props.stopSearching();
    } else if (query.length > 0) {
      props.startSearching();
    }

    if (query === '') {
      setItemArray([]);
      props.setCustomAssetList(itemArray);
    } else {
      allAssetInSection.forEach((val, i) => {
        if (val.assetType.includes(query) || val.kksTag.includes(query)) {
          itemArray.push(val);
        }
      });

      props.setCustomAssetList(itemArray);
    }
  };


  return (
    <View
      style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Searchbar
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="rgba(0,0,0,0.4)"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onFocus={() => {
          onFocus();
        }}
        onBlur={() => {
          onBlur();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '95%',
    borderWidth: 1,
    backgroundColor: '#EBF0F5',
    fontSize: 15,
    height: 48,
    borderColor: '#EBF0F5',
    borderRadius: 20,
  },
});

const mapStateToProps = state => {
  return {
    customSearchAssetList: state.customSearchAssetList,
    allAssetInSection: state.allAssetInSection,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCustomAssetList: value => {
      dispatch(AllActions.customSearchForAsset(value));
    },

    startSearching: () => {
      dispatch(AllActions.isSearchForAsset());
    },
    stopSearching: () => {
      dispatch(AllActions.isNotSearchingForAsset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomSearchBar);
