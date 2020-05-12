package invenio.api.utils;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import invenio.api.jobseeker.JobSeekerRepository;

@Component
@Transactional
public class WebUtils {
	private static final Logger log = LoggerFactory.getLogger("WebUtils.class");
	@Autowired
	private JavaMailSender sender;
	@Autowired
	HttpServletRequest request;
	@Autowired
	private JobSeekerRepository usersRepository;

//	private static final String UPLOADED_FOLDER = "static" + File.separator + "images";
	private static final String UPLOADED_FOLDER = "C://SpringWS//invenio-ui//public//images//upload";

	public void sendMail(String to, String msg, String subject) {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		try {
			helper.setTo(to);
			helper.setText(msg);
			helper.setSubject(subject);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		try {
			sender.send(message);
		} catch (MailException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void addProfilePhoto(MultipartFile file, long id, String folder) throws IllegalStateException, IOException {
		try {
			// save dir
			// request.getSession().getServletContext().getRealPath(UPLOADED_FOLDER)
			String destDir = UPLOADED_FOLDER + File.separator + folder + File.separator + id + File.separator
					+ "profile" + File.separator;
			log.info("This is path {}", destDir);

			// innitalize file
			File dir = new File(destDir);
			// if folder does not exist create it
			if (!dir.exists()) {
				new File(destDir).mkdirs();
			}

			MultipartFile multipartFile = (MultipartFile) file;
			String fileName = file.getOriginalFilename(); // set

			String img = usersRepository.findById(id).get().getImage();

			File doc = new File(destDir + File.separator + img);
			if (doc.exists()) {
				doc.delete();
			}

			// rename file to md5
			String parseMd5 = md5(fileName.toLowerCase());
			File destination = new File(destDir + File.separator + parseMd5);
			if (!destination.exists()) {
				new File(destDir + File.separator + parseMd5).mkdirs();
			}

			// save to file system and db
			multipartFile.transferTo(destination);
			usersRepository.findById(id).ifPresent(a -> {
				a.setImage(parseMd5);
				usersRepository.save(a);
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Resource GetImageResource(Long id, String folder) {
		try {
			usersRepository.findById(id).map(a -> {
				String filePath = UPLOADED_FOLDER + File.separator + folder + File.separator + id + File.separator
						+ "profile" + File.separator + a.getImage();
				log.info(filePath);
				File file = new File(filePath);
				if (file.exists()) {
					log.info("file exists");
				}
				Resource resource = new FileSystemResource(file);
				try {
					log.info(Long.toString(resource.contentLength()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return resource;
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String GetImagePath(Long id, String folder) {
		try {
			usersRepository.findById(id).map(a -> {
				String filePath = "c:/temp/images" + File.separator + folder + File.separator + id + File.separator
						+ "profile" + File.separator + a.getImage();
				log.info(filePath);
				
				return filePath;
			});

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public void deletefolder(long id) throws IllegalStateException, IOException {
		try {
			String destDir = request.getSession().getServletContext().getRealPath(UPLOADED_FOLDER) + File.separator
					+ "users" + File.separator + id;
			log.info("This is path {}", destDir);
			// innitalize file
			File dir = new File(destDir);
			if (dir.isDirectory()) {
				FileSystemUtils.deleteRecursively(dir);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String removefiles(long id, String image, String folder) {
		try {
			String realPathtoUploads = request.getSession().getServletContext()
					.getRealPath(UPLOADED_FOLDER + File.separator + folder);
			File file = new File(realPathtoUploads + File.separator + id + File.separator + image + "");
			file.delete();
		} catch (Exception e) {
			e.printStackTrace();
			return "Delete operation is failed.";
		}
		return "Delete Success.";
	}

	public void getFiles(Model model, long id, String folder) {
		List<String> results = new ArrayList<String>();
		try {
			String realPathtoUploads = request.getSession().getServletContext()
					.getRealPath(UPLOADED_FOLDER + File.separator + folder);
			File[] files = new File(realPathtoUploads + File.separator + id).listFiles();
			for (File file : files) {
				if (file.isFile()) {
					results.add(file.getName());
					model.addAttribute("filenames", results);
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public String md5(String filename) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		String hash = DatatypeConverter
				.printHexBinary(MessageDigest.getInstance("MD5").digest(filename.getBytes("UTF-8")));
		return hash;
	}

}
