<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@include file="Master.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<title>Profile</title>
    <link type="text/css" rel="stylesheet" href="Styles/ProfileMaster.css" />
</head>
<body>

    <div class="containerBody">
        <table id="profTable" cellpadding="0" cellspacing="0">
            <tr>
                <td id="userPanel" class="userPanel" >
                    <a href='ProfileSummary.aspx' id="summarySelector">Summary</a>
                    <a href='OrderHistory.aspx' id="orderHistSelector">Order History</a>
                    <a href='WishListPage.aspx' id="wishListSelector">Wishlist</a>
                    <a href='NotificationPage.aspx' id="notifSelector">Notifications</a>
                    <a href='UserActivity.aspx' id="activitySelector">Activity</a>
                    <a href='ProfileChangeSettings.aspx' id="changeSettingSelector">Change Settings</a>
                    <a onclick="$('.loutServerBut').click()">Log out</a>
                </td>

                <td>
                    <div id="userContent">
                        <div id="userContentDiv">
                            <h1 class="containerContentDescriber" ID="selectedProf">
                             
                            </h1>

                            <div>
                                
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>
