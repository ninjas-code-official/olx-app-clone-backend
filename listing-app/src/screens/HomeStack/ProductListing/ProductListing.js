import { gql, useLazyQuery } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { itemsBySubCategory } from "../../../apollo/server";
import { Spinner, TextDefault } from "../../../components";
import { alignment, colors, scale } from "../../../utilities";
import FilterModal from "../FilterModal/FilterModal";
import ProductCard from "./ProductCard/ProductCard";
import styles from "./styles";

const PRODUCTS = gql`
  ${itemsBySubCategory}
`;

function ProductListing() {
  const route = useRoute();
  const searchCategory = route.params?.search ?? null;
  const subCategory = route.params?.subCategory ?? null;
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("");
  const [fetchProducts, { called, data, loading, error }] = useLazyQuery(PRODUCTS, {
    variables: { subCategory: subCategory, ...filter, sort },
  });

  useEffect(() => {
    let isProduct = true;
    if (!subCategory) return;
    (async () => {
      isProduct && (await fetchProducts());
    })();
  }, [subCategory, filter, sort]);

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  function headerView() {
    return (
      <View style={styles.headingRow}>
        {!loading && called && <TextDefault>{`${data.itemsByCategory.length} ads`}</TextDefault>}
        <TouchableOpacity style={styles.filterBtn} onPress={toggleModal}>
          <MaterialIcons name="tune" size={scale(20)} color={colors.buttonbackground} />
          <TextDefault style={styles.fontText} right>
            {"Filter"}
          </TextDefault>
        </TouchableOpacity>
      </View>
    );
  }
  if (error) {
    return <TextDefault>{JSON.stringify(error)}</TextDefault>;
  }
  if (loading) {
    return <Spinner spinnerColor={colors.spinnerColor1} backColor={"transparent"} />;
  }

  function emptyView() {
    return (
      <View style={[styles.flex, styles.emptyContainer]}>
        <Image style={styles.emptyImage} source={require("../../../assets/images/emptyView/noData.png")} />
        <TextDefault H5 center bold style={alignment.MTlarge}>
          No Ads found.
        </TextDefault>
        <TextDefault center light>
          Please contact with your provider!.
        </TextDefault>
      </View>
    );
  }

  return (
    <>
      <View style={[styles.flex, styles.mainContainer]}>
        <FlatList
          data={data?.itemsByCategory || []}
          style={styles.flex}
          contentContainerStyle={{ flexGrow: 1, ...alignment.PBlarge }}
          ListEmptyComponent={!loading && called && emptyView}
          ListHeaderComponent={headerView}
          ItemSeparatorComponent={() => <View style={styles.spacer} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCard {...item} />}
        />
      </View>
      <FilterModal
        visible={modalVisible}
        onModalToggle={toggleModal}
        setSort={setSort}
        setFilter={setFilter}
        searchCategory={searchCategory}
      />
    </>
  );
}
export default React.memo(ProductListing);
