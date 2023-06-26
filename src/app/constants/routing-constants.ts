/**
 * Routing urls
 */
export class RoutingConstants {
  public static Dashboard = 'user/dashboard';
  public static DashboardUrl = 'dashboard';
  public static Login = 'login';
  public static UserAdd = 'add';
  public static UserAddUrl = 'user/add';
  public static UserEdit = ':mode/:userId';
  public static UserEditURL = (mode: any, userId: any) => `user/${mode}/${userId}`;
}
