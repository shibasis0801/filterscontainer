import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Dimensions, FlatList, Shape, StyleSheet, Text, View} from 'react-native';

const data = [
  "black",
  "silver",
  "gray",
  "white",
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
]

export default function App() {
  return (
    <View style={{
      flex: 1, margin: 10
    }}>
      <List />
    </View>
  );
};

/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */

import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

let dimensions = Dimensions.get("window");
dimensions.height -= 20
dimensions.width -= 20

const layoutProvider = new LayoutProvider(
    index => index,
    (type, dim) => {
        dim.height = dimensions.height;
        switch (type) {
            case 0: dim.width = 0.3 * dimensions.width
                return
            case 1: dim.width = 0.7 * dimensions.width
                return
        }
    })

function newDataProvider() {
    return new DataProvider((r1, r2) => {
        return r1 !== r2;
    });
}

const _dataProvider = newDataProvider();

const Filter = (name: string) => ({ name, type: 0 })
const Separator = (name: string) => ({ name, type: 1 })

const filterOptions = [
    Filter("Size"),
    Filter("Color"),
    Filter("Brand"),
    Filter("Categories"),
    Filter("Bundles"),
    Filter("Country of Origin"),
    Filter("Price Range"),
    Filter("Discount"),
    Filter("Rating"),
    Separator("Shirts"),
    Filter("Body Shape"),
    Filter("Pattern"),
    Filter("Sleeve Length"),
    Filter("Shape"),
    Filter("Character"),
    Filter("Weave Patter"),
    Filter("Occasion"),
]


const filtersDataProvider = newDataProvider();

function List() {
  let [ dataProvider, _ ] = useState(_dataProvider.cloneWithRows([
      { ratio: 0.3, data: filterOptions },
      { ratio: 0.7 }
  ]))

  return (
      <RecyclerListView
          isHorizontal={true}
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={((type, data) => (
              !type ? (
                  <FilterOptions filters={filterOptions}/>
              ) : (
                  <View style={{ flex: 1, backgroundColor: "red" }}>
                      <View style={{ backgroundColor: "green", margin: 10, flexBasis: 200, flexGrow: 1 }}></View>
                      <View style={{ backgroundColor: "green", margin: 10, flexBasis: 200, flexGrow: 3 }}></View>
                      <View style={{ backgroundColor: "green", margin: 10, flexBasis: 200, flexGrow: 1 }}></View>
                  </View>
              )))}
      />
  )
}



function FilterOptions(props: {filters: typeof filterOptions}) {
    const [ dataProvider, _ ] = useState(filtersDataProvider.cloneWithRows(props.filters))
    const [ dimensions, setDimensions ] = useState({ width: 0, height: 0 })

    let filterLayoutProvider: LayoutProvider | null = null

    if (dimensions.width && dimensions.height) {
        filterLayoutProvider = new LayoutProvider(
            index => filterOptions[index].type,
            (type, dim) => {
                dim.width = dimensions.width;
                switch (type) {
                    case 0: dim.height = 100
                        return
                    case 1: dim.height = 100
                        return
                }
            })
    }


    return (
        <View style={{ flex: 1, backgroundColor: "lightblue" }} onLayout={event =>
            setDimensions({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height })
        }>
            {filterLayoutProvider != null && (
                <RecyclerListView
                    layoutProvider={filterLayoutProvider}
                    dataProvider={dataProvider}
                    rowRenderer={(type, data) => (
                        <View style={{ flex: 1, borderColor: "blue", borderBottomWidth: 4 }}>
                            <Text>
                                {data.name}
                            </Text>
                        </View>
                    )}
                />
            )}

        </View>
    );
}
