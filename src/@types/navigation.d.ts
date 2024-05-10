import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { IconNameProps } from "../components/DrawerContentButton";

interface CustomOptions extends DrawerNavigationOptions {
  iconName: IconNameProps;
  isDivider?: boolean;
  sectionTitle?: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined;
      SignUp: undefined;
      Drawer: undefined;
      TabRoutes: undefined;
      Main: undefined;
      HomeScreen: undefined;
      New: undefined;
      ReservationDetail: {
        bookingId: string;
      };
      CustomerProfile: undefined;
      CustomerReservationDetail: {
        customerReservationId: string;
      };
    }
  }
}
