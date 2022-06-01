import com.Ebay.Services.UserService;
import com.opensymphony.xwork2.ActionSupport;

public class login extends ActionSupport
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String loginUName;
	private String loginPass;
	
	public String execute() throws Exception 
	{
		//here connect with database using jdbc and check login credentials
		
		String msg = "";
		
		//validate
		if(loginUName.length()==0 || loginPass.length()==0)
		{
			this.addFieldError("scrName", "Field is required!");
			msg = ERROR;
		}
		
		//Now authenticate
		
		if(msg!=ERROR && UserService.validateUserLogin(loginUName, loginPass))
		{
			this.addActionMessage("Login successful!!!");
			msg = SUCCESS;
		}
		else
		{
			this.addActionError("Login failed");
			msg = ERROR;
		}
		
		
		
//		if(loginUName.equals("janeeta"))
//			return "success";
		
		return msg;
	 
	}


	
	
	//-------------------------------------------------------------
	public String getLoginUName() {
		return loginUName;
	}

	public void setLoginUName(String loginUName) {
		this.loginUName = loginUName;
	}

	public String getLoginPass() {
		return loginPass;
	}

	public void setLoginPass(String loginPass) {
		this.loginPass = loginPass;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
//-------------------------------------------------------------

}
