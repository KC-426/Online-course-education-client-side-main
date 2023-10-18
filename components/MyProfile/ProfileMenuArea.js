import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import EditModal from "../common/EditModal";
import Link from "next/link";
import { useGetMyCoursesQuery } from "../../redux/api/apiSlice";
import { base_url } from "../../config";
import axios from "axios";

const ProfileMenuArea = () => {
  const { logout, user } = useAuth();
  const [request, setRequest] = useState(false);
  const user__ = useSelector((state) => state.user.currentUser);

  console.log(user__);
  const {
    data: myOrders,
    isLoading,
    isError,
  } = useGetMyCoursesQuery(user?.email, {
    skip: !request,
  });
  useEffect(() => {
    if (user__?.email) {
      setRequest(true);
    }
  }, [user]);

  // setShow
  const [show, setShow] = useState(false);
  // handleClose
  const handleClose = () => setShow(false);
  // handleShow
  const handleShow = () => setShow(true);

  const [paymetHistory, setPaymentHistory] = useState([]);

  const fetchPaymentHistory = async () => {
    try {
      const url = `${base_url}/api/v1/payment_by_userid/${user__?._id}`;

      const res = await axios.get(url, { withCredentials: true });
      console.log(res);

      if (res.data.success) {
        setPaymentHistory(res.data.payments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <>
      <section className="profile__menu pb-70 grey-bg-2">
        <div className="container">
          <div className="row">
            <div className="col-xxl-4 col-md-4">
              <div className="profile__menu-left white-bg mb-50">
                <h3 className="profile__menu-title">
                  <i className="fa-regular fa-square-list"></i> Your Menu
                </h3>
                <div className="profile__menu-tab">
                  <div
                    className="nav nav-tabs flex-column justify-content-start text-start"
                    id="nav-tab"
                    role="tablist"
                  >
                    <button
                      className="nav-link active"
                      id="nav-account-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-account"
                      type="button"
                      role="tab"
                      aria-controls="nav-account"
                      aria-selected="true"
                    >
                      {" "}
                      <i className="fa-regular fa-user"></i> My Account
                    </button>
                    <button
                      className="nav-link"
                      id="nav-order-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-order"
                      type="button"
                      role="tab"
                      aria-controls="nav-order"
                      aria-selected="false"
                    >
                      <i className="fa-regular fa-file-lines"></i>Orders
                    </button>

                    <button className="nav-link" onClick={logout}>
                      <i className="fa-regular fa-arrow-right-from-bracket"></i>{" "}
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-8 col-md-8">
              <div className="profile__menu-right">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-account"
                    role="tabpanel"
                    aria-labelledby="nav-account-tab"
                  >
                    <div className="profile__info">
                      <div className="profile__info-top d-flex justify-content-between align-items-center">
                        <h3 className="profile__info-title">
                          Profile Information
                        </h3>
                        <button
                          onClick={handleShow}
                          className="profile__info-btn"
                          type="button"
                        >
                          <i className="fa-regular fa-pen-to-square"></i> Edit
                          Profile
                        </button>
                      </div>

                      <div className="profile__info-wrapper white-bg">
                        <div className="profile__info-item">
                          <p>Name</p>
                          <h4>{user__?.name}</h4>
                        </div>
                        <div className="profile__info-item">
                          <p>Email</p>
                          <h4>{user__?.email}</h4>
                        </div>
                        <div className="profile__info-item">
                          <p>Phone</p>
                          <h4>{user__?.phoneNumber}</h4>
                        </div>
                        {/* <div className="profile__info-item">
                          <p>Address</p>
                          <h4>Abingdon, Maryland(MD), 21009</h4>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-order"
                    role="tabpanel"
                    aria-labelledby="nav-order-tab"
                  >
                    <div className="order__info">
                      <div className="order__info-top d-flex justify-content-between align-items-center">
                        <h3 className="order__info-title">My Orders</h3>
                        {/* <button type="button" className="order__info-btn">
                          <i className="fa-regular fa-trash-can"></i> Clear
                        </button> */}
                      </div>

                      <div className="order__list white-bg table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">payment ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Price</th>
                              <th scope="col">Purchase At</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paymetHistory?.map((order) => {
                              return (
                                <tr key={order?._id}>
                                  <td className="order__id">
                                    {order?.paymentId}
                                  </td>
                                  <td>
                                    <Link
                                      href={`/course-details/${order?._id}`}
                                    >
                                      <a className="order__title">
                                        {order?.course?.title}
                                      </a>
                                    </Link>
                                  </td>
                                  <td>₹{order?.amount}</td>
                                  <td>
                                    {new Date(order?.createdAt).getDate()}/
                                    {new Date(order?.createdAt).getMonth() + 1}/
                                    {new Date(order?.createdAt).getFullYear()}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditModal show={show} handleClose={handleClose} />
    </>
  );
};

export default ProfileMenuArea;
