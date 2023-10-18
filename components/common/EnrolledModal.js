import { Modal } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { loginFailure } from "../../redux/features/userSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { base_url, key_id_razorPay } from "../../config";
import axios from "axios";
import Head from "next/head";
import { useEffect } from "react";
// import Razorpay from "razorpay";
// import Razorpay from "razorpay";

// stripePromise
const stripePromise = loadStripe(
  "pk_test_51KYNhaLbyBVvY2i8wtD0oB9BfL7xqe7DpVtTQb6PzoOWwMUCqQoAOEAPALZuaIbLONev4n0uOVAYYCUIfRiRV3qw00x3Ko33kS"
);

const EnrolledModal = ({ show, handleClose, singleCourse }) => {
  const { user } = useAuth();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(singleCourse['course'].title)

  const router = useRouter();

  const createOrder = async (amount) => {
    console.log(currentUser);

    try {
      console.log(amount);

      const url = `${base_url}/api/v1/create_payment_order`;

      const res = await axios.post(
        url,
        { amount, currentUser, singleCourse },
        { withCredentials: true }
      );

      if (res.data.success) {
        console.log(res);

        var options = {
          key: key_id_razorPay, // Enter the Key ID generated from the Dashboard
          amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Acme Corp", //your business name
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);

            // console.log(handleClose, singleCourse);

            const url = `${base_url}/api/v1/payment_done`;
            const res = await axios.post(url, {
              singleCourse,
              currentUser,
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log(res);

            if (res.data.success) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: `Your Payment ${singleCourse?.amount}₹ is Successful`,
                text: "This Course is Added in Your Course Please Check.",
              });

              router.push("/");
            }
          },
          prefill: {
            //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            name: "Gaurav Kumar", //your customer's name
            email: "gaurav.kumar@example.com",
            contact: "9000090000", //Provide the customer's phone number for better conversion rates
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        console.log(window);
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 400) {
        Swal.fire({
          position: "top-center",
          icon: "warning",
          title: error.response.data.message,
        });
      }
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <div className="test-mode">
          {/* <a
            href="https://stripe.com/docs/testing#cards"
            rel="noreferrer"
            target="_blank"
          >

          </a> */}
        </div>

        <div className="course__popup-close">
          <button
            type="button"
            className="course__popup-close-btn"
            onClick={handleClose}
          >
            <i className="fa-light fa-xmark"></i>
          </button>
        </div>

        <Modal.Body>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0">
              <div className="p-relative">
                <div className="course__popup-top d-flex align-items-start mb-40">
                  <div className="course__popup-thumb mr-20">
                    <img
                      src={singleCourse?.thumb_img?.url}
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="course__popup-content">
                    <h3 className="course__popup-title">
                      <a href="#">{singleCourse?.title}</a>
                    </h3>
                    <p className="course__popup-title">
                      <a href="#">{singleCourse?.description?.slice(0, 20)}</a>
                    </p>
                    {/* <div className="course__sm-rating">
                                 <ul>
                                    <li><a href="#"> <i className="fa-solid fa-star"></i> </a></li>
                                    <li><a href="#"> <i className="fa-solid fa-star"></i> </a></li>
                                    <li><a href="#"> <i className="fa-solid fa-star"></i> </a></li>
                                    <li><a href="#"> <i className="fa-solid fa-star"></i> </a></li>
                                    <li><a href="#"> <i className="fa-solid fa-star"></i> </a></li>
                                 </ul>
                              </div> */}
                  </div>
                </div>
                <div className="course__popup-info">
                  <div className="row gx-3">
                    <div className="col-xl-12">
                      <div className="course__popup-input mb-3">
                        <input
                          defaultValue={currentUser?.email}
                          type="email"
                          placeholder="Email"
                        />
                        <span className="course__popup-input-icon">
                          <i className="fa-light fa-envelope"></i>
                        </span>
                      </div>
                    </div>
                    {/* <button
                      onClick={() => {}}
                      type="button"
                      className="tp-btn w-100 text-center"
                    >
                      Enroll
                      <i className="far fa-arrow-right ms-3"></i>
                    </button> */}

                    <button
                      type="submit"
                      className="tp-btn w-100 my-3"
                      onClick={() => {
                        createOrder(singleCourse?.amount);
                      }}
                    >
                      Pay ₹{singleCourse?.amount}
                    </button>

                    {/* {singleCourse?.amount && (
                      <Elements stripe={stripePromise}>
                        <CheckoutForm singleCourse={singleCourse} />
                      </Elements>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EnrolledModal;
