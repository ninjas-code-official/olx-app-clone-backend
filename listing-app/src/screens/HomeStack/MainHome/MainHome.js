import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from "react-native";
import { categories, nearByItems } from "../../../apollo/server";
import { LocationModal, MainHeader, Spinner, TextDefault, TextError } from "../../../components";
import SearchModal from "../../../components/Modal/SearchModal/SearchModal";
import { alignment, colors, textStyles } from "../../../utilities";
import Card from "./Card/Card";
import styles from "./styles";
const GET_CATEGORIES = gql`
  ${categories}
`;
const GET_ITEMS = gql`
  ${nearByItems}
`;

const COLORS = ["#ffd54d", "#6df8f3", "#ff7a7a", "#d5b09f", "#eccbcb"];

function MainHome() {
  const navigation = useNavigation();
  //const [filters, setFilters] = useState({title: "Current"});c
  const [filters, setFilters] = useState({zone: "642e439cd320c55d90dd6cd9", title: "Islamabad", latitude: null, longitude: null });
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSerachVisible] = useState(false);
  const { loading: CategoryLoading, error: CategoryError, data: CategoryData } = useQuery(GET_CATEGORIES);
  const { loading, refetch, networkStatus, error, data } = useQuery(GET_ITEMS, {
    variables: {
      longitude: filters.longitude || null,
      latitude: filters.latitude || null,
      zone: filters.zone || null,
    },
    fetchPolicy: "network-only",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <MainHeader
          search={search}
          onModalToggle={toggleModal}
          toggleSearch={toggleSearch}
          locationText={filters.title}
        />
      ),
    });
  }, [navigation, filters, search]);

  useEffect(() => {
    storageLocation();
  }, []);

  async function storageLocation() {
    const locationStr = await AsyncStorage.getItem("location");
    const locationObj = JSON.parse(locationStr);
    if (locationObj) {
      const location = { title: locationObj.label, ...locationObj, zone: null };
      //setFilters(location); //add this line and remove second setFilters to get current location
      setFilters({zone: "642e439cd320c55d90dd6cd9", title: "Islamabad", latitude: null, longitude: null });
    }
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  function toggleSearch() {
    setSerachVisible((prev) => !prev);
  }

  if (loading || CategoryLoading) {
    return <Spinner colors={colors.spinnerColor1} backColor={"transparent"} />;
  }

  function emptyView() {
    return (
      <View style={[styles.flex, styles.emptyContainer]}>
        <Image style={styles.emptyImage} source={require("../../../assets/images/emptyView/noData.png")} />
        <TextDefault H5 center bold style={alignment.MTlarge}>
          No data found.
        </TextDefault>
        <TextDefault center light>
          Please contact with your provider!.
        </TextDefault>
      </View>
    );
  }
  function categoryHeader() {
    return (
      <View style={styles.categoryHeader}>
        <TextDefault H5 bold>
          {"Browse Categories"}
        </TextDefault>
        <TouchableOpacity style={styles.rightBtn} onPress={() => navigation.navigate("Categories")}>
          <TextDefault H5 bolder>
            See All
          </TextDefault>
        </TouchableOpacity>
      </View>
    );
  }

  const items = data?.nearByItems ?? [];

  const searchRestaurants = (searchText) => {
    const data = [];
    items.forEach((item) => {
      const regex = new RegExp(
        searchText.replace(/[\\[\]()+?.*]/g, (c) => "\\" + c),
        "i"
      );
      const result = item.title.search(regex);
      if (result < 0) {
        const result = item.subCategory.title.search(regex);
        if (result < 0) {
          const result = item.subCategory.category.title.search(regex);
          if (result > -1) data.push(item);
          return;
        }
        data.push(item);
        return;
      }
      data.push(item);
    });
    return data;
  };

  function renderHeader() {
    return (
      <>
        <View style={styles.headerContainer}>
          {categoryHeader()}
          {CategoryError ? (
            <TextError text={CategoryError.message} textColor={colors.fontThirdColor} style={textStyles.Light} />
          ) : (
            <FlatList
              data={CategoryData ? CategoryData.categories.slice(0, 5) : []}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.categoryContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.cardContainer}
                  onPress={() =>
                    navigation.navigate("SubCategories", { headerTitle: item.title, categoryId: item._id })
                  }
                >
                  <View style={styles.textViewContainer}>
                    <View style={[styles.iconContainer, { backgroundColor: COLORS[index % 5] }]}>
                      <Image
                        style={styles.imgResponsive}
                        source={{ uri: item.image }}
                        defaultSource={require("../../../assets/images/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png")}
                      />
                    </View>
                    <TextDefault numberOfLines={1} uppercase small light>
                      {item.title ?? "Current Location"}
                    </TextDefault>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <View style={styles.spacer} />
        <View style={styles.headerTitle}>
          <TextDefault H5 bold>
            {"All Ads"}
          </TextDefault>
        </View>
      </>
    );
  }

  return (
    <View style={[styles.flex, styles.container]}>
      {/* Browswer Container */}
      {error ? (
        <TextError text={error.message} textColor={colors.fontThirdColor} style={textStyles.Light} />
      ) : (
        <FlatList
          data={search ? searchRestaurants(search) : items}
          style={[styles.flex, styles.flatList]}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.containerBox, ...alignment.PBlarge }}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={emptyView}
          ListHeaderComponent={renderHeader}
          numColumns={2}
          refreshControl={
            <RefreshControl
              colors={[colors.spinnerColor1]}
              refreshing={networkStatus === 4}
              onRefresh={() => {
                if (networkStatus === 7) {
                  refetch();
                }
              }}
            />
          }
          renderItem={({ item }) => <Card {...item} />}
        />
      )}

      {/* Modal */}
      <LocationModal visible={modalVisible} onModalToggle={toggleModal} setFilters={setFilters} />
      <SearchModal
        categories={CategoryData?.categories ?? []}
        setSearch={setSearch}
        visible={searchVisible}
        onModalToggle={toggleSearch}
      />
    </View>
  );
}

export default MainHome;
