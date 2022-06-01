import com.Ebay.Models.UserModel;
import com.Ebay.Services.UserService;
import com.opensymphony.xwork2.ActionSupport;

public class SignupSubmitAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	private String scrName, emailAddr, password,cPassword,contactNo;
	
	//private UserModel user = new UserModel();
	
	public String validateAndRegister()
	{
		//validate
		
		String msg = "";
		
		if(scrName.length()==0)
		{
			this.addFieldError("scrName", "Field is required!");
			msg = ERROR;
		}
		if(emailAddr.length()==0)
		{
			this.addFieldError("emailAddr", "Field is required!");
			msg = ERROR;
		}
		if(password.length()==0)
		{
			this.addFieldError("password", "Field is required!");
			msg = ERROR;
		}
		if(cPassword.length()==0)
		{
			this.addFieldError("cPassword", "Field is required!");
			msg = ERROR;
		}
		if(contactNo.length()==0)
		{
			this.addFieldError("contactNo", "Field is required!");
			msg = ERROR;
		}
		if(!cPassword.equals(password))
		{
			this.addFieldError("password", "Passwords does not match!");
			msg = ERROR;
		}

		
		//Now register in db
		
		UserModel user = new UserModel(scrName,emailAddr, password,cPassword,contactNo);
		
		if(msg!=ERROR && UserService.regUser(user))
		{
			this.addActionMessage("User Registration successfull!!!");
			msg = SUCCESS;
		}
		else
		{
			this.addActionError("Registration failed!!!");
			msg = ERROR;
		}
	
		return msg;
		
	}
	
	
	
	
	
	//-----------------------------------------------------------------------

	public String getScrName() 
	{
		return scrName;
	}





	public void setScrName(String scrName) {
		this.scrName = scrName;
	}





	public String getEmailAddr() {
		return emailAddr;
	}





	public void setEmailAddr(String emailAddr) {
		this.emailAddr = emailAddr;
	}





	public String getPassword() {
		return password;
	}





	public void setPassword(String password) {
		this.password = password;
	}





	public String getcPassword() {
		return cPassword;
	}





	public void setcPassword(String cPassword) {
		this.cPassword = cPassword;
	}





	public String getContactNo() {
		return contactNo;
	}





	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}





	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

	//-----------------------------------------------------------------------	
	
	
	
	
	
	
	
//	public String execute() throws Exception {
//	      return "success";
//	   }

}
