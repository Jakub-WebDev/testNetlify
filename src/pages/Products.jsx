import React, { useReducer, useEffect } from "react";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import ProductRating from "../components/ProductRating";
import useProducts from "../hooks/useProducts";
import useFavourite from "../hooks/useFavourite";
import { useDispatch } from "react-redux";
import AddToCartButton from "../components/AddToCartButton";

// Initial state for the reducer
const initialState = {
  displayedProducts: [],
  currentPage: 1,
  productsPerPage: 10,
  sortOption: "",
  selectedRatings: [],
  selectedPriceRanges: [],
  selectedBrands: [],
  selectedCategories: [],
  selectedCashbacks: [],
  layoutMode: "gridProduct",
  filteredProducts: [],
};

// Reducer function to manage state changes
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DISPLAYED_PRODUCTS":
      return { ...state, displayedProducts: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_PRODUCTS_PER_PAGE":
      return { ...state, productsPerPage: action.payload };
    case "SET_SORT_OPTION":
      return { ...state, sortOption: action.payload };
    case "SET_SELECTED_RATINGS":
      return { ...state, selectedRatings: action.payload };
    case "SET_SELECTED_PRICE_RANGES":
      return { ...state, selectedPriceRanges: action.payload };
    case "SET_SELECTED_BRANDS":
      return { ...state, selectedBrands: action.payload };
    case "SET_SELECTED_CATEGORIES":
      return { ...state, selectedCategories: action.payload };
    case "SET_SELECTED_CASHBACKS":
      return { ...state, selectedCashbacks: action.payload };
    case "SET_LAYOUT_MODE":
      return { ...state, layoutMode: action.payload };
    case "SET_FILTERED_PRODUCTS": // New case for setting filtered products
      return { ...state, filteredProducts: action.payload };
    default:
      return state;
  }
};

const ProductsPage = () => {
  const { products: allProducts } = useProducts();
  const dispatch = useDispatch();
  const [state, localDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    applySortingAndPagination();
  }, [
    allProducts,
    state.sortOption,
    state.selectedRatings,
    state.selectedPriceRanges,
    state.selectedBrands,
    state.selectedCategories,
    state.selectedCashbacks,
    state.currentPage,
    state.productsPerPage,
  ]);

  const setCurrentPage = (pageNumber) => {
    localDispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
  };

  const filterAndSortProducts = (products) => {
    let filteredProducts = [...products];

    // Filtering products based on selected criteria
    const filters = [
      (product) =>
        state.selectedRatings.length === 0 ||
        state.selectedRatings.includes(product.rating),
      (product) =>
        state.selectedPriceRanges.length === 0 ||
        state.selectedPriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.newPrice >= min && product.newPrice <= max;
        }),
      (product) =>
        state.selectedBrands.length === 0 ||
        state.selectedBrands.includes(product.brand),
      (product) =>
        state.selectedCategories.length === 0 ||
        state.selectedCategories.includes(product.category),
      (product) =>
        state.selectedCashbacks.length === 0 ||
        state.selectedCashbacks.some((c) => product.cashback >= c),
    ];

    filters.forEach((filter) => {
      filteredProducts = filteredProducts.filter(filter);
    });

    localDispatch({
      type: "SET_FILTERED_PRODUCTS",
      payload: filteredProducts,
    });

    // Sorting products based on the selected sort option
    const sortedProducts = [...filteredProducts];
    if (state.sortOption === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.newPrice - b.newPrice);
    } else if (state.sortOption === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.newPrice - a.newPrice);
    } else if (state.sortOption === "alphabetical") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.sortOption === "cashback") {
      sortedProducts.sort((a, b) => b.cashback - a.cashback);
    }

    // Handle pagination
    const startIndex = (state.currentPage - 1) * state.productsPerPage;
    const paginatedProducts = sortedProducts.slice(
      startIndex,
      startIndex + state.productsPerPage
    );

    localDispatch({
      type: "SET_DISPLAYED_PRODUCTS",
      payload: paginatedProducts,
    });
  };

  const applySortingAndPagination = () => {
    filterAndSortProducts(allProducts);
  };

  const { handleFavouriteToggle } = useFavourite();

  return (
    <div className={styles.productsPage}>
      <h1 className={styles.pageTitle}>Products</h1>
      <div className={styles.navButtons}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>
      <div className={styles.sortDropdowns}>
        <div>
          <label htmlFor="productsPerPage">Per Page </label>
          <select
            className={styles.perpageDropdown}
            id="productsPerPage"
            value={state.productsPerPage}
            onChange={(e) => {
              localDispatch({
                type: "SET_PRODUCTS_PER_PAGE",
                payload: Number(e.target.value),
              }); // Dispatching the action to update productsPerPage
              localDispatch({ type: "SET_CURRENT_PAGE", payload: 1 }); // Resetting current page to 1 whenever products per page changes
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortOptions">Sort By </label>
          <select
            className={styles.sortbyDropdown}
            id="sortOptions"
            value={state.sortOption} // Accessing from the state object
            onChange={(e) => {
              const option = e.target.value;
              localDispatch({ type: "SET_SORT_OPTION", payload: option }); // Dispatching action to update sort option
              filterAndSortProducts(allProducts); // Call the function to filter and sort products
            }}
          >
            <option value="">None</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="alphabetical">Alphabetically</option>
            <option value="cashback">Cashback</option>
          </select>
        </div>

        <div>
          <label className={styles.gridRadioIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="4" height="4" rx="1" stroke="#101750" />
              <rect x="10" y="2" width="4" height="4" rx="1" stroke="#101750" />
              <rect x="2" y="10" width="4" height="4" rx="1" stroke="#101750" />
              <rect
                x="10"
                y="10"
                width="4"
                height="4"
                rx="1"
                stroke="#101750"
              />
            </svg>

            <input
              className={styles.gridRadioButton}
              type="radio"
              name="layout"
              value="gridProduct"
              checked={state.layoutMode === "gridProduct"} // Accessing from the state object
              onChange={() => {
                localDispatch({
                  type: "SET_LAYOUT_MODE",
                  payload: "gridProduct",
                }); // Dispatching action to update layout mode
              }}
            />
          </label>
          <label className={styles.flexRadioIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="12" height="4" rx="1" stroke="#000000" />
              <rect
                x="2"
                y="10"
                width="12"
                height="4"
                rx="1"
                stroke="#101750"
              />
            </svg>

            <input
              className={styles.gridRadioButton}
              type="radio"
              name="layout"
              value="flexProduct"
              checked={state.layoutMode === "flexProduct"} // Accessing from the state object
              onChange={() => {
                localDispatch({
                  type: "SET_LAYOUT_MODE",
                  payload: "flexProduct",
                }); // Dispatching action to update layout mode
              }}
            />
          </label>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.filtersContainer}>
          <div>
            <label className={styles.filterLabel}>Product Brand</label>
            <div className={styles.filterOptions}>
              {["Casio", "Apple", "Sony", "Nike", "Vike", "Glossiness"].map(
                (brand) => (
                  <div key={brand} className={styles.selectFilter}>
                    <label>
                      <input
                        className={styles.brandCheckbox}
                        type="checkbox"
                        value={brand}
                        checked={state.selectedBrands.includes(brand)} // Check if the brand is in the selectedBrands array
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          localDispatch({
                            type: "SET_SELECTED_BRANDS",
                            payload: isChecked
                              ? [...state.selectedBrands, brand] // Add brand if checked
                              : state.selectedBrands.filter((b) => b !== brand), // Remove brand if unchecked
                          });
                          filterAndSortProducts(allProducts); // Call the function to filter and sort products
                        }}
                      />

                      {brand}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <label className={styles.filterLabel}>Discount Offer</label>
            <div className={styles.filterOptions}>
              {["0.1", "0.3", "0.5"].map((cashback) => (
                <div key={cashback} className={styles.selectFilter}>
                  <label>
                    <input
                      className={styles.discountCheckbox}
                      type="checkbox"
                      value={cashback}
                      checked={state.selectedCashbacks.includes(cashback)} // Check if the cashback is in the selectedCashbacks array
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        localDispatch({
                          type: "SET_SELECTED_CASHBACKS",
                          payload: isChecked
                            ? [...state.selectedCashbacks, cashback] // Add cashback if checked
                            : state.selectedCashbacks.filter(
                                (c) => c !== cashback
                              ), // Remove cashback if unchecked
                        });
                        filterAndSortProducts(allProducts); // Call the function to filter and sort products
                      }}
                    />
                    {Number(cashback) * 100}% Cashback
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={styles.filterLabel}>Rating</label>
            <div className={styles.filterOptions}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className={styles.ratingFilter}>
                  <label>
                    <input
                      className={styles.ratingCheckbox}
                      type="checkbox"
                      value={rating}
                      checked={state.selectedRatings.includes(rating)} // Check if the rating is in the selectedRatings array
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        localDispatch({
                          type: "SET_SELECTED_RATINGS",
                          payload: isChecked
                            ? [...state.selectedRatings, rating] // Add rating if checked
                            : state.selectedRatings.filter((r) => r !== rating), // Remove rating if unchecked
                        });
                        filterAndSortProducts(allProducts); // Call the function to filter and sort products
                      }}
                    />
                    {/* Render the SVG {rating} times */}
                    {[...Array(rating)].map((_, i) => (
                      <svg
                        className={styles.checkboxStar}
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1591_5677)">
                          <path
                            d="M7.09749 1.89137C7.45972 1.13224 8.54028 1.13224 8.90251 1.89137L10.0704 4.33882C10.2162 4.64433 10.5066 4.85534 10.8422 4.89958L13.5308 5.25399C14.3647 5.36391 14.6986 6.39158 14.0885 6.97067L12.1218 8.83768C11.8763 9.07073 11.7653 9.41217 11.827 9.74502L12.3207 12.4115C12.4739 13.2386 11.5997 13.8737 10.8604 13.4725L8.47702 12.1789C8.1795 12.0174 7.8205 12.0174 7.52298 12.1789L5.13959 13.4725C4.40033 13.8737 3.52614 13.2386 3.67929 12.4115L4.17304 9.74502C4.23467 9.41217 4.12373 9.07073 3.87823 8.83768L1.91145 6.97067C1.30142 6.39158 1.63533 5.36391 2.46924 5.25399L5.15779 4.89958C5.4934 4.85534 5.78384 4.64433 5.92962 4.33882L7.09749 1.89137Z"
                            fill="#F9BA00"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1591_5677">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    ))}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={styles.filterLabel}>Categories</label>
            <div className={styles.filterOptions}>
              {["rtv", "clothes", "jewelry", "other"].map((category) => (
                <div key={category} className={styles.selectFilter}>
                  <label>
                    <input
                      className={styles.categoryCheckbox}
                      type="checkbox"
                      value={category}
                      checked={state.selectedCategories.includes(category)} // Check if the category is in the selectedCategories array
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        localDispatch({
                          type: "SET_SELECTED_CATEGORIES",
                          payload: isChecked
                            ? [...state.selectedCategories, category] // Add category if checked
                            : state.selectedCategories.filter(
                                (c) => c !== category
                              ), // Remove category if unchecked
                        });
                        filterAndSortProducts(allProducts); // Call the function to filter and sort products
                      }}
                    />
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={styles.filterLabel}>Price</label>
            <div className={styles.filterOptions}>
              {["0-15", "15-30", "30-45", "45-70", "70-100"].map((range) => (
                <div key={range} className={styles.selectFilter}>
                  <label>
                    <input
                      className={styles.priceCheckbox}
                      type="checkbox"
                      value={range}
                      checked={state.selectedPriceRanges.includes(range)} // Check if the range is selected
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        localDispatch({
                          type: "SET_SELECTED_PRICE_RANGES",
                          payload: isChecked
                            ? [...state.selectedPriceRanges, range] // Add range if checked
                            : state.selectedPriceRanges.filter(
                                (r) => r !== range
                              ), // Remove range if unchecked
                        });
                        filterAndSortProducts(allProducts); // Call the function to filter and sort products
                      }}
                    />
                    ${range}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {allProducts.length > 0 ? (
          <div className={styles.productsContainer}>
            {state.displayedProducts.map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className={styles[state.layoutMode]}
              >
                <img
                  className={styles.productImage}
                  src={product.image}
                  alt={product.name}
                />
                <h2 className={styles.productName}>{product.name}</h2>
                <ProductRating rating={product.rating} />
                <div className={styles.productPrices}>
                  <p className={styles.productPrice}>${product.newPrice}.00</p>
                  <p className={styles.productOldPrice}>${product.price}.00</p>
                </div>
                <div className={styles.productDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                  in est adipiscing in phasellus non in justo.
                </div>
                <div className={styles.smallButtons}>
                  <AddToCartButton
                    product={product}
                    className={styles.smallButton}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.999023 1.59916C0.999023 1.44001 1.06225 1.28738 1.17478 1.17484C1.28732 1.06231 1.43995 0.999084 1.5991 0.999084H2.04556C2.80566 0.999084 3.26172 1.51035 3.52175 1.98561C3.69538 2.30245 3.82099 2.6697 3.91941 3.00255C3.94602 3.00045 3.97271 2.99938 3.99942 2.99935H13.9991C14.6632 2.99935 15.1433 3.63463 14.9608 4.27391L13.4983 9.40178C13.3671 9.86173 13.0897 10.2664 12.708 10.5546C12.3263 10.8427 11.8611 10.9987 11.3828 10.9988H6.62376C6.14169 10.9988 5.67296 10.8405 5.2896 10.5482C4.90625 10.2559 4.6295 9.84585 4.50188 9.38098L3.8938 7.16309L2.88567 3.76425L2.88487 3.75785C2.76005 3.30419 2.64324 2.87933 2.46882 2.56249C2.30159 2.25445 2.16718 2.19924 2.04636 2.19924H1.5991C1.43995 2.19924 1.28732 2.13602 1.17478 2.02348C1.06225 1.91095 0.999023 1.75831 0.999023 1.59916ZM5.05795 6.87185L5.65883 9.06334C5.77885 9.497 6.1733 9.79864 6.62376 9.79864H11.3828C11.6002 9.79863 11.8116 9.7278 11.9852 9.59685C12.1587 9.46591 12.2849 9.28199 12.3445 9.07294L13.7343 4.1995H4.26745L5.04675 6.82945L5.05795 6.87185Z"
                        fill="#7E33E0"
                      />
                      <path
                        d="M7.80003 13.4007C7.80003 13.8251 7.63143 14.2322 7.33134 14.5323C7.03124 14.8324 6.62422 15.001 6.19982 15.001C5.77542 15.001 5.3684 14.8324 5.0683 14.5323C4.7682 14.2322 4.59961 13.8251 4.59961 13.4007C4.59961 12.9763 4.7682 12.5693 5.0683 12.2692C5.3684 11.9691 5.77542 11.8005 6.19982 11.8005C6.62422 11.8005 7.03124 11.9691 7.33134 12.2692C7.63143 12.5693 7.80003 12.9763 7.80003 13.4007ZM6.59987 13.4007C6.59987 13.2946 6.55772 13.1929 6.4827 13.1179C6.40767 13.0428 6.30592 13.0007 6.19982 13.0007C6.09372 13.0007 5.99196 13.0428 5.91694 13.1179C5.84191 13.1929 5.79977 13.2946 5.79977 13.4007C5.79977 13.5068 5.84191 13.6086 5.91694 13.6836C5.99196 13.7587 6.09372 13.8008 6.19982 13.8008C6.30592 13.8008 6.40767 13.7587 6.4827 13.6836C6.55772 13.6086 6.59987 13.5068 6.59987 13.4007Z"
                        fill="#7E33E0"
                      />
                      <path
                        d="M13.4006 13.4007C13.4006 13.8251 13.232 14.2322 12.9319 14.5323C12.6318 14.8324 12.2248 15.001 11.8004 15.001C11.376 15.001 10.969 14.8324 10.6689 14.5323C10.3688 14.2322 10.2002 13.8251 10.2002 13.4007C10.2002 12.9763 10.3688 12.5693 10.6689 12.2692C10.969 11.9691 11.376 11.8005 11.8004 11.8005C12.2248 11.8005 12.6318 11.9691 12.9319 12.2692C13.232 12.5693 13.4006 12.9763 13.4006 13.4007ZM12.2005 13.4007C12.2005 13.2946 12.1583 13.1929 12.0833 13.1179C12.0083 13.0428 11.9065 13.0007 11.8004 13.0007C11.6943 13.0007 11.5925 13.0428 11.5175 13.1179C11.4425 13.1929 11.4004 13.2946 11.4004 13.4007C11.4004 13.5068 11.4425 13.6086 11.5175 13.6836C11.5925 13.7587 11.6943 13.8008 11.8004 13.8008C11.9065 13.8008 12.0083 13.7587 12.0833 13.6836C12.1583 13.6086 12.2005 13.5068 12.2005 13.4007Z"
                        fill="#7E33E0"
                      />
                    </svg>
                  </AddToCartButton>
                  <button
                    onClick={(e) => handleFavouriteToggle(product.id, e)}
                    className={styles.smallButton}
                  >
                    <svg
                      className={
                        product.favourite ? styles.redHeart : styles.purpleHeart
                      }
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13.7141 3.30182C12.9713 2.55413 11.9865 2.09955 10.9387 2.02074C9.89102 1.94192 8.84997 2.24411 8.00494 2.87236C7.11474 2.20608 6.00672 1.90396 4.90401 2.02683C3.80131 2.1497 2.78582 2.68844 2.06205 3.53456C1.33828 4.38068 0.959991 5.47133 1.00336 6.58688C1.04672 7.70243 1.50852 8.76001 2.29576 9.54665L7.50818 14.7917C7.57323 14.8577 7.65061 14.9101 7.73587 14.9459C7.82113 14.9816 7.91257 15 8.00494 15C8.0973 15 8.18875 14.9816 8.27401 14.9459C8.35927 14.9101 8.43665 14.8577 8.50169 14.7917L13.7141 9.54665C14.1218 9.13671 14.4452 8.64995 14.6658 8.11419C14.8864 7.57843 15 7.00418 15 6.42424C15 5.8443 14.8864 5.27004 14.6658 4.73428C14.4452 4.19852 14.1218 3.71177 13.7141 3.30182ZM12.7276 8.55396L8.00494 13.2992L3.28227 8.55396C2.8661 8.13343 2.5826 7.59861 2.46733 7.01657C2.35207 6.43454 2.41017 5.83121 2.63436 5.28228C2.85854 4.73335 3.23882 4.26325 3.72749 3.93097C4.21616 3.59868 4.79147 3.419 5.38123 3.41447C6.16912 3.41641 6.92404 3.73293 7.4802 4.29452C7.54524 4.3605 7.62262 4.41288 7.70788 4.44862C7.79314 4.48437 7.88459 4.50277 7.97695 4.50277C8.06931 4.50277 8.16076 4.48437 8.24602 4.44862C8.33128 4.41288 8.40866 4.3605 8.47371 4.29452C9.04625 3.79527 9.7859 3.53355 10.543 3.56233C11.3 3.59111 12.0179 3.90824 12.5514 4.44954C13.0849 4.99083 13.3941 5.71586 13.4164 6.47788C13.4387 7.23989 13.1725 7.98199 12.6716 8.55396H12.7276Z" />
                    </svg>
                  </button>
                  <button className={styles.smallButton}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.74982 6.83334H7.99982V5.08334C7.99982 4.92863 7.93836 4.78026 7.82897 4.67086C7.71957 4.56146 7.5712 4.50001 7.41649 4.50001C7.26178 4.50001 7.11341 4.56146 7.00401 4.67086C6.89461 4.78026 6.83316 4.92863 6.83316 5.08334V6.83334H5.08316C4.92845 6.83334 4.78007 6.8948 4.67068 7.00419C4.56128 7.11359 4.49982 7.26196 4.49982 7.41667C4.49982 7.57138 4.56128 7.71976 4.67068 7.82915C4.78007 7.93855 4.92845 8.00001 5.08316 8.00001H6.83316V9.75001C6.83316 9.90472 6.89461 10.0531 7.00401 10.1625C7.11341 10.2719 7.26178 10.3333 7.41649 10.3333C7.5712 10.3333 7.71957 10.2719 7.82897 10.1625C7.93836 10.0531 7.99982 9.90472 7.99982 9.75001V8.00001H9.74982C9.90453 8.00001 10.0529 7.93855 10.1623 7.82915C10.2717 7.71976 10.3332 7.57138 10.3332 7.41667C10.3332 7.26196 10.2717 7.11359 10.1623 7.00419C10.0529 6.8948 9.90453 6.83334 9.74982 6.83334ZM13.664 12.8358L11.4998 10.6892C12.3399 9.64175 12.7467 8.31226 12.6366 6.9741C12.5266 5.63593 11.908 4.3908 10.908 3.49471C9.90812 2.59863 8.60288 2.11972 7.26069 2.15645C5.91851 2.19317 4.64141 2.74275 3.69199 3.69217C2.74257 4.64159 2.19299 5.91869 2.15626 7.26088C2.11954 8.60306 2.59845 9.9083 3.49453 10.9082C4.39061 11.9081 5.63575 12.5267 6.97391 12.6368C8.31208 12.7469 9.64156 12.3401 10.689 11.5L12.8357 13.6467C12.8899 13.7013 12.9544 13.7447 13.0255 13.7744C13.0966 13.804 13.1728 13.8192 13.2498 13.8192C13.3268 13.8192 13.4031 13.804 13.4742 13.7744C13.5452 13.7447 13.6098 13.7013 13.664 13.6467C13.7691 13.5379 13.8279 13.3925 13.8279 13.2413C13.8279 13.09 13.7691 12.9446 13.664 12.8358ZM7.41649 11.5C6.60888 11.5 5.81941 11.2605 5.14791 10.8118C4.47641 10.3632 3.95304 9.72543 3.64398 8.9793C3.33492 8.23317 3.25406 7.41214 3.41162 6.62005C3.56917 5.82796 3.95807 5.10038 4.52914 4.52932C5.1002 3.95826 5.82778 3.56936 6.61987 3.4118C7.41196 3.25424 8.23298 3.33511 8.97911 3.64416C9.72525 3.95322 10.363 4.47659 10.8117 5.14809C11.2603 5.81959 11.4998 6.60907 11.4998 7.41667C11.4998 8.49964 11.0696 9.53825 10.3038 10.304C9.53807 11.0698 8.49946 11.5 7.41649 11.5Z"
                        fill="#7E33E0"
                      />
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.error}>No products found</p>
        )}
      </div>

      <div className={styles.paginationButtonsContainer}>
        {Array.from(
          {
            length: Math.ceil(
              state.filteredProducts.length / state.productsPerPage
            ),
          },
          (_, index) => (
            <button
              className={styles.paginationButton}
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              disabled={state.currentPage === index + 1}
            >
              {index + 1}
            </button>
          )
        ).filter(
          (_, index) =>
            index + 1 <=
            Math.ceil(state.filteredProducts.length / state.productsPerPage)
        )}{" "}
        {/* Optional: to ensure only the required buttons are displayed */}
      </div>
    </div>
  );
};

export default ProductsPage;
