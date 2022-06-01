<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>

<html>
<head>
 <title>Master Page</title>
    <script type="text/javascript" src="Scripts/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="Scripts/Root.js"></script>
    <script type="text/javascript" src="Scripts/jquery.cookie.js"></script>
    <script type="text/javascript" src="Scripts/jquery.form.js"></script>
    <script type="text/javascript">
    </script>
	<script type="text/javascript" src="Scripts/HomePage.js"></script>
	<link rel="stylesheet" type="text/css" href="MasterStyle.css">
	<link rel="stylesheet" type="text/css" href="Styles/Homepage.css">
    
</head>

<body>
        <div id="topPerm">
            <div id="topBar">
                <img id="logo" src="Images/Logo.png" />
                <div class="searchLoginSection">

                    <div class="loginSection" id="logButs">
                    
                    <s:form method="post" action="signup">
                    <span><input type="submit" value="SignUp" class="itemInteractionButton loginBut"/></span>
                    <span class="itemInteractionButton loginBut">Login</span>
                    </s:form> 
                    </div>

                    <div class="clearFix"></div>



<s:form method="post" action="login">

                    <div class="loginHover" id="logHover">
                        <s:submit class="lReq" type="button">Login</s:submit>
                        
                        <table class="inputTable">
                            <tr class="itemQuantity" id="loginERow">
                                <td class="valName">User Name
                                </td>
                                <td class="colon">:
                                </td>
                                <td class="val">
                                    <s:textfield name="loginUName" class="inputTextBox" ID="loginUName" />
                                </td>
                            </tr>
                            <tr class="itemQuantity" id="loginPRow">
                                <td class="valName">Password</td>
                                <td class="colon">:
                                </td>
                                <td class="val">
                                    <s:textfield class="inputTextBox" name="loginPass" type="password" ID="loginPass" />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>
                                    <div id="lInf" class="informer">
                                        
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

</s:form>


                    <div class="searchSection">
                        <div class="searchTextBoxContainer">
                            <input type="text" class="searchTextBox" Text="Search" />
                            <img onclick="javascript:SearchItem();" src="Images/Search.png" />
                        </div>

                        <div class="catSubCatContainer">
                            <b class="listDescriber">Category : </b>
                            <select class="dropDownList searchCatDropDown" ID="searchCatDropDown"></select>

                            <b class="listDescriber">Subcategory : </b>
                            <select class="dropDownList searchSubcatDropDown" ID="searchSubcatDropDown"></select>
                        </div>
                        <div class="clearFix"></div>
                    </div>
                </div>
                <div class="clearFix"></div>
            </div>
            <div class="clearFix"></div>

            <div id="catSection">
                <div id="catDispDiv" class="categories"></div>

                <div id="intAddSect" class="additionalSection">
                    <a class="integratedDiv" href="CartPage.aspx">
                        <img src="Images/Cart.png" />
                    </a>
                    <a class="integratedDiv" href="ComparePage.aspx">
                        Compare List
                    </a>
                    <a class="integratedDiv" href="RequestPage.aspx">
                        Make Request
                    </a>
                    <a class="integratedDiv" href="ForumMain.aspx">
                        Support
                    </a>
                    <a class="integratedDiv" href="homepage.aspx">
                        Home
                    </a>
                </div>
                <div class="clearFix"></div>
            </div>
            <div class="subCategoryHoverMenu"></div>
        </div>

        <div class="middleContentContainer" id="middleContentContainer">
        </div>

        <div id="bottomSection">
            <table id="FooterTable">
                <tr id="heads">
                    <td>Trending brands</td>
                    <td>My Account</td>
                    <td>Customer Care</td>
                </tr>

                <tr>
                    <td><a href="Categorypage.aspx?sc=22">Apple Iphone</a></td>
                    <td><a href="HomePage.aspx">Home</a></td>
                    <td>Have a Question?</td>
                </tr>

                <tr>
                    <td><a href="Categorypage.aspx?sc=21">Nokia</a></td>
                    <td><a href="CartPage.aspx">My Cart</a></td>
                    <td>Email at</td>
                    
                </tr>

                <tr>
                    <td><a href="Categorypage.aspx?sc=28">Vaio</a></td>
                    <td><a href="WishListPage.aspx">Wish List</a></td>
                    <td>myebay@gmail.com</td>
                </tr>

                <tr>
                    <td><a href="CategoryPage.aspx?brand=ASUS">Asus</a></td>
                    <td><a href="ForumMain.aspx">FAQ's</a></td>
                    <td></td>
                </tr>


                <tr>
                    <td></td>
                    <td><a href="OrderPage.aspx">Order List</a></td>
                    <td></td>
                </tr>
            </table>
        </div>
</body>
</html>
