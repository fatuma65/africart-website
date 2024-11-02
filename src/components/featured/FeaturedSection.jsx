import { useEffect, useState } from "react"
import { useProduct } from "../../contexts/customHook"

const Featured = () => {
    const {displayedProducts} = useProduct()
    const [newArrival, setNewArrival] = useState([])

    const handleNewArrivals = () => {
        // get todays date
        const todayDate = new Date()
        // filter to get the date in which the products were created.
        const featuredProducts = displayedProducts
        .filter((product) => {
            const productsCreatedDate = new Date(product.attributes.createdAt)
            // get the day difference and convert the milliseconds to day
            const dateDifference = (todayDate - productsCreatedDate) / (1000 * 60 * 60 *24)
            // return the products which were created in the last 28 days.
            return dateDifference >= 36
        })
        setNewArrival(featuredProducts)
    }
    useEffect(() => {
        handleNewArrivals()
    }, [displayedProducts])

  return (
    <div className=" lg:mb-16">
      <h2 className="font-semibold text-center text-xl text-[#D51C75]">Featured Products</h2>
      <h1 className="font-bold text-4xl text-center">New Arrivals</h1>
      <div className="lg:flex gap-4 justify-center items-center mt-4">
        <div className="lg:w-1/3">
          {newArrival[0] && (
            <img
              src={newArrival[0].attributes.productImage.data[0]?.attributes.url}
              alt="African artifact"
              className="w-full lg:h-96 h-64 rounded lg:p-0 p-2"
            />
          )}
        </div>
        <div className="lg:w-1/4 flex flex-col lg:gap-4">
          {newArrival.slice(1, 3).map((product) => (
            <img
              key={product.id}
              src={product.attributes.productImage.data[0]?.attributes.url}
              alt="African artifact"
              className="w-full lg:h-44 h-64 rounded lg:p-0 p-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Featured