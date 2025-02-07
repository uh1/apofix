import java.nio.charset.Charset;

public class ApoFix {
	static Charset cp1256 = Charset.forName("windows-1256");
	static Charset latin5 = Charset.forName("ISO-8859-9");

	public static String fixEncoding(String str) {
		return new String(str.getBytes(latin5), cp1256);
	}

	public static String unfixEncoding(String str) {
		return new String(str.getBytes(cp1256), latin5);
	}
}
