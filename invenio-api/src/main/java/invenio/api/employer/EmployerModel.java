package invenio.api.employer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import invenio.api.utils.PasswordHash;

@Entity
public class EmployerModel {
	@Id
	@Column(length=6)
	private String empCode;
	private String empName;
	private String empDescription;
	private String email;
	private String password;
	private String hashedPassword;
	private String telephone;
	
	public EmployerModel() {}
	
	public EmployerModel(String empCode, String empName, String empDescription, String email, String password, String telephone) {
		super();
		this.empCode = empCode;
		this.empName = empName;
		this.empDescription = empDescription;
		this.email = email;
		this.password = password;
		this.telephone = telephone;
	}
	
	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmpCode() {
		return empCode;
	}	
	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public String getEmpDescription() {
		return empDescription;
	}
	public void setEmpDescription(String empDescription) {
		this.empDescription = empDescription;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
		this.hashedPassword = PasswordHash.toHexString(password);
		System.out.println(hashedPassword);
	}
	public String getHashedPassword() {
		return this.hashedPassword;
	}
	public boolean hashMatch(String value) {
		return this.hashedPassword.equals(PasswordHash.toHexString(value));
	}
	@Override
	public String toString() {
		return "EmployerModel [empCode=" + empCode + ", empName=" + empName + ", empDescription=" + empDescription
				+ ", email=" + email + ", password=" + password + ", hashedPassword=" + hashedPassword + ", telephone="
				+ telephone + "]";
	}
	
}
