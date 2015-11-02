package com.ctbri.operator;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;

import com.ctbri.model.Account;
import com.ctbri.util.DbHelper;

public class AccountOperator {

	private static final Logger log = Logger.getLogger(AccountOperator.class);
	
	@SuppressWarnings("unchecked")
	public static boolean login(String id, String passwd)
	{
		Account account = new Account();
		account.setId(id);
		account.setPasswd(passwd);
		
		Session session = null;	
				
		try{

			session = DbHelper.getSession();
						
			String hql = "from com.ctbri.model.Account where id=:id and passwd=:passwd";
			Query query = session.createQuery(hql);
			query.setString("id", id);
			query.setString("passwd", passwd);
			List<Account> accounts = query.list();
			
			if(accounts.size() > 0)
			{
			    return true;
			} else
			{
			    return false;
			}
		}catch(Exception e)
		{
			log.error(e.getMessage());
		}
		return false;
	}
}
