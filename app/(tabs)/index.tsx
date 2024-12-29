import React, { useState } from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import { Searchbar, Button, Appbar } from "react-native-paper";

const DashboardScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const cars = [
    {
      id: "1",
      title: "Toyota Camry",
      price: "$24,425",
      category: "Honda",
      image:
        "https://i.pinimg.com/736x/8a/de/23/8ade234a1519b634739bd6d4f49edaf9.jpg",
    },
    {
      id: "2",
      title: "BMW X5",
      price: "$26,120",
      category: "BMW",
      image:
        "https://i.pinimg.com/736x/df/a1/ab/dfa1abbf4929054c2325b555315acd75.jpg",
    },
    {
      id: "3",
      title: "Lamborghini Huracán",
      price: "$28,940",
      category: "Sport",
      image:
        "https://i.pinimg.com/736x/65/44/a8/6544a8858e304cf22051c35a5856f06a.jpg",
    },
    {
      id: "4",
      title: "Alphard",
      price: "$22,140",
      category: "Honda",
      image:
        "https://i.pinimg.com/736x/27/4b/b8/274bb86d3db1f9da6f9a21d3ebbfd6ee.jpg",
    },
    {
      id: "5",
      title: "HR-V",
      price: "$22,140",
      category: "Honda",
      image:
        "https://i.pinimg.com/736x/0e/98/15/0e98158075f06446d0307327db353e8d.jpg",
    },
    {
      id: "6",
      title: "Gallardo",
      price: "$22,140",
      category: "Honda",
      image:
        "https://i.pinimg.com/736x/1b/78/34/1b7834ac857b41b0227eff058200dda3.jpg",
    },
    {
      id: "7",
      title: "Tesla",
      price: "$22,140",
      category: "Honda",
      image:
        "https://i.pinimg.com/736x/f1/88/83/f1888330dc3c21616b9381f6cbbba8be.jpg",
    },
    {
      id: "8",
      title: "Toyota Fortuner",
      price: "$22,140",
      category: "Honda",
      image:
        "https://i.pinimg.com/736x/3d/5b/84/3d5b84f5f4130db35984447a6a48bc77.jpg",
    },
    {
      id: "9",
      title: "Supra MK4",
      price: "$22,140",
      category: "Honda",
      image:
        "https://i.pinimg.com/736x/96/50/e0/9650e05979e6d65e8cf1cd806c5e94e3.jpg",
    },
    {
      id: "10",
      title: "Mazda RX7",
      price: "$22,140",
      category: "Honda",
      image:
        "https://i.pinimg.com/736x/10/ca/04/10ca04899df806effc417ebeeb919ac9.jpg",
    },
  ];

  const filteredCars = cars.filter((car) =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCar = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Button mode="contained" style={styles.productButton}>
        Detail
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Cars" />
      </Appbar.Header>

      <Searchbar
        placeholder="Cari mobil..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={filteredCars}
        renderItem={renderCar}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productList}
        contentContainerStyle={styles.productListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#6200ea",
  },
  searchbar: {
    margin: 16,
    borderRadius: 20,
    elevation: 5,
  },
  productList: {
    justifyContent: "space-between",
  },
  productListContainer: {
    padding: 16,
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
    elevation: 3,
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  productPrice: {
    marginTop: 4,
    color: "#888",
  },
  productButton: {
    marginTop: 8,
    width: "100%",
    borderRadius: 20,
  },
});

export default DashboardScreen;
