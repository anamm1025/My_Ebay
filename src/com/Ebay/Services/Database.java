package com.Ebay.Services;

import java.sql.Connection;
import java.sql.DriverManager;

public class Database {

	public static Connection getConnection()
	{
		try{
			DriverManager.registerDriver(new com.microsoft.sqlserver.jdbc.SQLServerDriver());
			Connection con = DriverManager.getConnection("jdbc:sqlserver://DESKTOP-KUU0J0I;databaseName=MY EBAY;integratedSecurity=true;");
			return con;		
		}catch(Exception e){
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public static void close(Connection c)
	{
		try{
			c.close();
		}catch(Exception e){
			System.out.println(e.getMessage());			
		}
	}
	
}
