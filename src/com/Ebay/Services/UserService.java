package com.Ebay.Services;

import java.sql.Connection;
import java.sql.PreparedStatement;

import com.Ebay.Models.*;

public class UserService 
{
	
	
	//------------------------------------------------------------------------------------------
	
	//Register user information in database.
	
	public static boolean regUser(UserModel m)
	{
		Connection con = null;
		try{
			con = Database.getConnection();
			
			PreparedStatement ps = con.prepareStatement("insert into Users(UserID,[Password],PrimaryContact,isVerifiedAcccount,UserName) values (?,?,?,?,?)");
			ps.setString(1, m.getEmailAddr());
			ps.setString(2, m.getPassword());
			ps.setString(3, m.getContactNo());
			ps.setString(4, "1");
			ps.setString(5, m.getScrName());
		
			return ps.executeUpdate() == 1; //return true if update is successfull
			
		}catch(Exception e){
			System.out.println(e.getMessage());
			return false;
		}finally{
			Database.close(con);
		}
		
	}

	//------------------------------------------------------------------------------------------
	
	//Login validation
	
	public static boolean validateUserLogin(String uName, String pwd){
		
		Connection con = null;
		
		try{
			con = Database.getConnection();
			PreparedStatement ps = con.prepareStatement("select UserID from Users where UserName = ? AND [Password] = ?");
			ps.setString(1, uName);
			ps.setString(2, pwd);

			return ps.executeQuery().next(); //result set has next entry then allow login
			
		}catch(Exception e){
			System.out.println(e.getMessage());
			return false;
		}finally{
			Database.close(con);
		}
	}
	
	
	
}
