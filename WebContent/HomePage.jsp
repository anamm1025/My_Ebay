<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@include file="Master.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Home Page</title>
	<script type="text/javascript" src="Scripts/SHomePage.js"></script>
	<link rel="stylesheet" type="text/css" href="Styles/Homepage.css">
    
</head>
<form method="post">
		<div class="categoriesOrBrandSection containerBody">
        <h1 class="containerHeader">Categories</h1>
        <div class="containerContent" id="subCatsContainer">
        </div>
    </div>

    <div class="categoriesOrBrandSection containerBody">
        <h1 class="containerHeader">Brands</h1>
        <div class="containerContent">
            <br />
            <div class="content" id="brandsContainer">
            </div>
            <div class="clearFix"></div>
        </div>
    </div>
    </form>
</body>
</html>
