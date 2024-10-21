import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const fetchBrands = async () => {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/brands",
  );
  return data.data;
};

const BrandsPage = () => {
  const { data: brands, isLoading, error } = useQuery(["brands"], fetchBrands);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching brands</div>;

  return (
    <div className="container py-5">
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="View Brands In Fresh Cart." />
      </Helmet>
      <h2 className="text-center mb-4">Our Brands</h2>
      <div className="row gy-4">
        {brands.map((brand) => (
          <div key={brand._id} className="col-sm-6 col-md-4 col-lg-3">
            <Link to={`/Products?brandId=${brand._id}`}>
              <div className="card text-center brand-card shadow-sm">
                <img
                  src={brand.image}
                  alt={brand.name}
                  style={{ maxWidth: "120px", height: "auto" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{brand.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
