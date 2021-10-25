import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DesignerRoute from "./auth/DesignerRoute";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import ManagerRoute from "./auth/ManagerRoute";
// Pages
const Home = React.lazy(() => import("./pages/Home"));
const Register = React.lazy(() => import("./pages/Register"));
const Mobile = React.lazy(() => import("./pages/Mobile"));
const Login = React.lazy(() => import("./pages/Login"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const SaladCategoryF = React.lazy(() => import("./pages/SaladCategoryF"));
const FoodCategoryF = React.lazy(() => import("./pages/FoodCategoryF"));
const SoupCategoryF = React.lazy(() => import("./pages/SoupCategoryF"));
const SaladCart = React.lazy(() => import("./pages/SaladCart"));
const SoupCart = React.lazy(() => import("./pages/SoupCart"));
const FoodCart = React.lazy(() => import("./pages/FoodCart"));
const CustomCart = React.lazy(() => import("./pages/CustomCart"));
const Refund = React.lazy(() => import("./pages/Refund"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));

//Designer Pages
const DesignerDashboard = React.lazy(() =>
  import("./pages/Designer/DesignerDashboard")
);
const MainSlide = React.lazy(() => import("./pages/Designer/MainSlide"));
const SaladCategory = React.lazy(() =>
  import("./pages/Designer/SaladCategory")
);

const Restaurant = React.lazy(() => import("./pages/Designer/Restaurant"));

const Salad = React.lazy(() => import("./pages/Designer/Salad"));
const DesignerRestaurantSalad = React.lazy(() =>
  import("./pages/Designer/RestaurantSalad")
);
const DesignerRestaurantAddon = React.lazy(() =>
  import("./pages/Designer/RestaurantAddon")
);

const DesignerAddon = React.lazy(() => import("./pages/Designer/Addon"));

const Soup = React.lazy(() => import("./pages/Designer/Soup"));

const Custom = React.lazy(() => import("./pages/Designer/Custom"));

const DesignerRestaurantSoup = React.lazy(() =>
  import("./pages/Designer/RestaurantSoup")
);

const FoodCategory = React.lazy(() => import("./pages/Designer/FoodCategory"));

const Food = React.lazy(() => import("./pages/Designer/Food"));

const DesignerRestaurantFood = React.lazy(() =>
  import("./pages/Designer/RestaurantFood")
);

const DesignerPromotion = React.lazy(() =>
  import("./pages/Designer/Promotion")
);

const AllCategories = React.lazy(() =>
  import("./pages/Designer/AllCategories")
);
const AllFoodItems = React.lazy(() => import("./pages/Designer/AllFoodItems"));
const DesignerInventory = React.lazy(() =>
  import("./pages/Designer/Inventory")
);

const DesignerProfile = React.lazy(() =>
  import("./pages/Designer/DesignerProfile")
);

//User Pages
const UserDashboard = React.lazy(() => import("./pages/User/UserDashboard"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const UserProfile = React.lazy(() => import("./pages/User/UserProfile"));
const UserOrders = React.lazy(() => import("./pages/User/MyOrders"));

//Admin Pages
const AdminDashboard = React.lazy(() => import("./pages/Admin/AdminDashBoard"));
const AdminUserManagement = React.lazy(() => import("./pages/Admin/Users"));
const AdminRestaurant = React.lazy(() =>
  import("./pages/Admin/AdminRestaurant")
);
const AdminDeliveredOrders = React.lazy(() =>
  import("./pages/Admin/AdminDeliveredOrders")
);
const AdminSalesByProduct = React.lazy(() =>
  import("./pages/Admin/AdminSalesByProduct")
);

const AdminInventory = React.lazy(() =>
  import("./pages/Admin/AdminInventory")
);

const AdminProfile = React.lazy(() =>
  import("./pages/Admin/AdminProfile")
);
//Manager Pages
const ManagerDashboard = React.lazy(() =>
  import("./pages/Manager/ManagerDashboard")
);
const AcceptedOrders = React.lazy(() =>
  import("./pages/Manager/AcceptedOrders")
);
const DeliveredOrders = React.lazy(() =>
  import("./pages/Manager/DeliveredOrders")
);
const SalesByProducts = React.lazy(() =>
  import("./pages/Manager/SalesByProducts")
);
const ChangeAvailability = React.lazy(() =>
  import("./pages/Manager/ChangeAvailability")
);
const ManagerProfile = React.lazy(() =>
  import("./pages/Manager/ManagerProfile")
);
const CreateOrder = React.lazy(() => import("./pages/Manager/CreateOrder"));
const CreateSalad = React.lazy(() => import("./pages/Manager/CreateSalad"));
const CreateSoup = React.lazy(() => import("./pages/Manager/CreateSoup"));
const CreateFood = React.lazy(() => import("./pages/Manager/CreateFood"));
const CreateCustom = React.lazy(() => import("./pages/Manager/CreateCustom"));
const ManagerCheckout = React.lazy(() => import("./pages/Manager/ManagerCheckout"));
const ManagerInventory = React.lazy(() =>
  import("./pages/Manager/ManagerInventory")
);

function App() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/refund" component={Refund} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/mobile/:userMobile" component={Mobile} />
          <Route path="/login" component={Login} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route
            path="/saladCategory/:saladCategoryId"
            component={SaladCategoryF}
          />
          <Route
            path="/foodCategory/:foodCategoryId"
            component={FoodCategoryF}
          />
          <Route path="/soupCategory/" component={SoupCategoryF} />
          <Route path="/saladCart/:saladId" component={SaladCart} />
          <Route path="/soupCart/:soupId" component={SoupCart} />
          <Route path="/foodCart/:foodId" component={FoodCart} />
          <Route path="/customCart/:customId" component={CustomCart} />
          <PrivateRoute path="/user/dashboard" component={UserDashboard} />
          <PrivateRoute path="/user/myProfile" component={UserProfile} />
          <PrivateRoute path="/user/orders" component={UserOrders} />
          <PrivateRoute path="/checkout" component={Checkout} />
          <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute path="/admin/users" component={AdminUserManagement} />
          <AdminRoute
            path="/admin/restaurant/:restaurantId"
            component={AdminRestaurant}
          />
          <AdminRoute
            path="/admin/deliveredOrders/:restaurantId"
            component={AdminDeliveredOrders}
          />
          <AdminRoute
            path="/admin/salesByProduct/:restaurantId"
            component={AdminSalesByProduct}
          />
          <AdminRoute
            path="/admin/inventory/:restaurantId"
            component={AdminInventory}
          />
          <AdminRoute
            path="/admin/profile"
            component={AdminProfile}
          />
          <ManagerRoute
            path="/manager/dashboard"
            component={ManagerDashboard}
          />
          <ManagerRoute
            path="/manager/acceptedOrders"
            component={AcceptedOrders}
          />
          <ManagerRoute
            path="/manager/deliveredOrders"
            component={DeliveredOrders}
          />
          <ManagerRoute
            path="/manager/salesByProducts"
            component={SalesByProducts}
          />
          <ManagerRoute
            path="/manager/changeAvailability"
            component={ChangeAvailability}
          />
          <ManagerRoute path="/manager/createOrder" component={CreateOrder} />
          <ManagerRoute path="/manager/createSalad" component={CreateSalad} />
          <ManagerRoute path="/manager/createSoup" component={CreateSoup} />
          <ManagerRoute path="/manager/createFood" component={CreateFood} />
          <ManagerRoute path="/manager/createCustomSalad" component={CreateCustom} />
          <ManagerRoute path="/manager/checkout" component={ManagerCheckout} />
          <ManagerRoute path="/manager/myProfile" component={ManagerProfile} />
          <ManagerRoute
            path="/manager/inventory"
            component={ManagerInventory}
          />
          <DesignerRoute
            path="/designer/dashboard"
            component={DesignerDashboard}
          />
          <DesignerRoute
            exact
            path="/designer/mainSlides"
            component={MainSlide}
          />
          <DesignerRoute
            path="/designer/saladCategory"
            component={SaladCategory}
          />
          <DesignerRoute path="/designer/restaurant" component={Restaurant} />
          <DesignerRoute path="/designer/salad" component={Salad} />
          <DesignerRoute
            path="/designer/res/salads/:restaurantId/:restaurantName"
            component={DesignerRestaurantSalad}
          />
          <DesignerRoute path="/designer/addon" component={DesignerAddon} />
          <DesignerRoute
            path="/designer/res/addons/:restaurantId/:restaurantName"
            component={DesignerRestaurantAddon}
          />
          <DesignerRoute path="/designer/soup" component={Soup} />
          <DesignerRoute
            path="/designer/res/soups/:restaurantId/:restaurantName"
            component={DesignerRestaurantSoup}
          />
          <DesignerRoute
            path="/designer/foodCategory"
            component={FoodCategory}
          />
          <DesignerRoute path="/designer/food" component={Food} />
          <DesignerRoute path="/designer/custom" component={Custom} />
          <DesignerRoute
            path="/designer/res/foods/:restaurantId/:restaurantName"
            component={DesignerRestaurantFood}
          />
          <DesignerRoute
            path="/designer/promotions"
            component={DesignerPromotion}
          />
          <DesignerRoute
            path="/designer/allCategories"
            component={AllCategories}
          />
          <DesignerRoute
            path="/designer/allFoodItems"
            component={AllFoodItems}
          />
          <DesignerRoute
            path="/designer/inventory"
            component={DesignerInventory}
          />
          <DesignerRoute
            path="/designer/profile"
            component={DesignerProfile}
          />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
