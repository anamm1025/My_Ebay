<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@include file="Master.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
 <title>Sign Up</title>
	<script type="text/javascript" src="Scripts/Registration.js"></script>
	<script type="text/javascript" src="Scripts/HomePage.js"></script>
	<link rel="stylesheet" type="text/css" href="MasterStyle.css">
	<link href="Styles/Registration.css" rel="stylesheet" type="text/css" />
</head>

<body>

<s:form action="SignupSubmitAction">

		<div class="containerBody">
        <h1 class="containerHeader">Create Account</h1>
        <div class="formContainer">
            <table class="inputTable containerContentVal">
                <tr id="nameRow">
                    <td class="valName">Screen Name</td>
                    <td class="colon">:</td>
                    <td class="val">
                        <s:textfield name="scrName" ID="scrName" class="inputTextBox"/>
                        <span class="informer" id="snInf"></span>
                    </td>
                </tr>

                <tr id="emailRow">
                    <td class="valName">
                            User ID (email)
                    </td>
                    <td class="colon">
                        :
                    </td>
                    <td class="val">
                        <s:textfield name="emailAddr" class="inputTextBox" ID="emailAddr"/>
                        <span id="mailInf" class="informer"></span>
                    </td>   
                </tr>

                <tr class="matchPass" id="passRow">
                    <td class="valName">Password</td>
                    <td class="colon">:</td>
                    <td class="val">
                        <s:password name="password" class="inputTextBox" ID="password" />
                        <span id="passInf" class="informer"></span>
                        <br />
                    </td>
                </tr>

                <tr class="matchPass" id="confirmPassRow">
                    <td class="valName">Confirm Password</td>
                    <td class="colon">:</td>
                    <td class="val">
                        <s:password name="cPassword" ID="cPassword" />
                        <span class="informer" id="cPassInf"></span>
                        <br />
                    </td>
                            
                </tr>

                <tr id="contactRow">
                    <td class="valName">Primary Contact No</td>
                    <td class="colon">:</td>
                    <td class="val">
                        <s:textfield name="contactNo" ID="contactNo" class="inputTextBox"/>
                        <span class="informer" id="contInf"></span>
                    </td>
                </tr>
            </table>

            <div class="submitButtonDivs">
                
                
                <s:submit class="serverSub">
                <div class="itemInteractionButton" id="submit">Submit</div></s:submit>
				
				
				<button type="button" class="serverSub hidden">
                <div class="itemInteractionButton" id="resetBut">Reset</div></button>
            </div>
        </div>
    </div>
    
    
    
</s:form>
    
    
    <s:if test="hasActionMessages()">
    Registration successfull! <a href="HomePage">Click here</a> to goto homepage.
    </s:if>
    <s:actionerror cssClass="error"/>
    
</body>
</html>
