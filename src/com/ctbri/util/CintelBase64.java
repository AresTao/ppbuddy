package com.ctbri.util;

import sun.misc.BASE64Decoder;
/*
 * base64编解码
 * @author ztwu
 * */
public class CintelBase64 {
	public static String encode(String s)
    {
        if (s == null)
        {
            return null;
        }
        return (new sun.misc.BASE64Encoder()).encode(s.getBytes());
    }
	
	private static final byte[] encodingTable = {
		(byte) '+', (byte) '/', (byte) 'l', (byte) 'm', (byte) '-', 
		(byte) 'A', (byte) 'o', (byte) 'p', (byte) 'B', (byte) 'b',
        (byte) 'F', (byte) 'E', (byte) 'r', (byte) 's', (byte) 'a', 
        (byte) 'K', (byte) 'e', (byte) 'f', (byte) '3', (byte) 'M',
        (byte) 'P', (byte) 'Q', (byte) 'R', (byte) 'S', (byte) 'T',
        (byte) 'C', (byte) 'D', (byte) 'U', (byte) 'V', (byte) 'H',  
        (byte) 'Z', (byte) '0', (byte) '1', (byte) 'I', (byte) 'W', 
        (byte) '4', (byte) 'Y', (byte) '7', (byte) '8', (byte) '%',
        (byte) '9', (byte) 'c', (byte) 'd', (byte) 'G', (byte) 'i',
        (byte) 'g', (byte) '5', (byte) '6', (byte) 'h', (byte) 'N', 
        (byte) 'j', (byte) 'k', (byte) 'n', (byte) 'J', (byte) 'w',
        (byte) 'q', (byte) 'L', (byte) '2', (byte) 'O', (byte) 'y',
        (byte) 't', (byte) 'u', (byte) 'x', (byte) 'X', (byte) 'v', 
        (byte) 'z', (byte) '@'
    };
    private static final byte[] decodingTable;
    static {
        decodingTable = new byte[128];

        for (int i = 0; i < 128; i++) {
            decodingTable[i] = (byte) -1;
        }
        decodingTable['+'] = 0; decodingTable['/'] = 1; decodingTable['l'] = 2; decodingTable['m'] = 3; decodingTable['-'] = 4;
        decodingTable['A'] = 5; decodingTable['o'] = 6; decodingTable['p'] = 7; decodingTable['B'] = 8; decodingTable['b'] = 9;
        decodingTable['F'] = 10;decodingTable['E'] = 11;decodingTable['r'] = 12;decodingTable['s'] = 13;decodingTable['a'] = 14;
        decodingTable['K'] = 15;decodingTable['e'] = 16;decodingTable['f'] = 17;decodingTable['3'] = 18;decodingTable['M'] = 19;
        decodingTable['P'] = 20;decodingTable['Q'] = 21;decodingTable['R'] = 22;decodingTable['S'] = 23;decodingTable['T'] = 24;
        decodingTable['C'] = 25;decodingTable['D'] = 26;decodingTable['U'] = 27;decodingTable['V'] = 28;decodingTable['H'] = 29;
        decodingTable['Z'] = 30;decodingTable['0'] = 31;decodingTable['1'] = 32;decodingTable['I'] = 33;decodingTable['W'] = 34;
        decodingTable['4'] = 35;decodingTable['Y'] = 36;decodingTable['7'] = 37;decodingTable['8'] = 38;decodingTable['%'] = 39;
        decodingTable['9'] = 40;decodingTable['c'] = 41;decodingTable['d'] = 42;decodingTable['G'] = 43;decodingTable['i'] = 44;
        decodingTable['g'] = 45;decodingTable['5'] = 46;decodingTable['6'] = 47;decodingTable['h'] = 48;decodingTable['N'] = 49;
        decodingTable['j'] = 50;decodingTable['k'] = 51;decodingTable['n'] = 52;decodingTable['J'] = 53;decodingTable['w'] = 54;
        decodingTable['q'] = 55;decodingTable['L'] = 56;decodingTable['2'] = 57;decodingTable['O'] = 58;decodingTable['y'] = 59;
        decodingTable['t'] = 60;decodingTable['u'] = 61;decodingTable['x'] = 62;decodingTable['X'] = 63;decodingTable['v'] = 64;
        decodingTable['z'] = 65;decodingTable['@'] = 66;      
    }
   
   

    public static byte[] encode(byte[] data) {
        byte[] bytes;

        int modulus = data.length % 3;

        if (modulus == 0) {
            bytes = new byte[(4 * data.length) / 3];
        } else {
            bytes = new byte[4 * ((data.length / 3) + 1)];
        }

        int dataLength = (data.length - modulus);
        int a1;
        int a2;
        int a3;

        for (int i = 0, j = 0; i < dataLength; i += 3, j += 4) {
            a1 = data[i] & 0xff;
            a2 = data[i + 1] & 0xff;
            a3 = data[i + 2] & 0xff;

            bytes[j] = encodingTable[(a1 >>> 2) & 0x3f];
            bytes[j + 1] = encodingTable[((a1 << 4) | (a2 >>> 4)) & 0x3f];
            bytes[j + 2] = encodingTable[((a2 << 2) | (a3 >>> 6)) & 0x3f];
            bytes[j + 3] = encodingTable[a3 & 0x3f];
        }

        int b1;
        int b2;
        int b3;
        int d1;
        int d2;

        switch (modulus) {
        case 0: /* nothing left to do */
            break;

        case 1:
            d1 = data[data.length - 1] & 0xff;
            b1 = (d1 >>> 2) & 0x3f;
            b2 = (d1 << 4) & 0x3f;

            bytes[bytes.length - 4] = encodingTable[b1];
            bytes[bytes.length - 3] = encodingTable[b2];
            bytes[bytes.length - 2] = (byte) '=';
            bytes[bytes.length - 1] = (byte) '=';

            break;

        case 2:
            d1 = data[data.length - 2] & 0xff;
            d2 = data[data.length - 1] & 0xff;

            b1 = (d1 >>> 2) & 0x3f;
            b2 = ((d1 << 4) | (d2 >>> 4)) & 0x3f;
            b3 = (d2 << 2) & 0x3f;

            bytes[bytes.length - 4] = encodingTable[b1];
            bytes[bytes.length - 3] = encodingTable[b2];
            bytes[bytes.length - 2] = encodingTable[b3];
            bytes[bytes.length - 1] = (byte) '=';

            break;
        }

        return bytes;
    }

    public static byte[] decode(byte[] data) {
        byte[] bytes;
        byte b1;
        byte b2;
        byte b3;
        byte b4;

        data = discardNonBase64Bytes(data);

        if (data[data.length - 2] == '=') {
            bytes = new byte[(((data.length / 4) - 1) * 3) + 1];
        } else if (data[data.length - 1] == '=') {
            bytes = new byte[(((data.length / 4) - 1) * 3) + 2];
        } else {
            bytes = new byte[((data.length / 4) * 3)];
        }

        for (int i = 0, j = 0; i < (data.length - 4); i += 4, j += 3) {
            b1 = decodingTable[data[i]];
            b2 = decodingTable[data[i + 1]];
            b3 = decodingTable[data[i + 2]];
            b4 = decodingTable[data[i + 3]];

            bytes[j] = (byte) ((b1 << 2) | (b2 >> 4));
            bytes[j + 1] = (byte) ((b2 << 4) | (b3 >> 2));
            bytes[j + 2] = (byte) ((b3 << 6) | b4);
        }

        if (data[data.length - 2] == '=') {
            b1 = decodingTable[data[data.length - 4]];
            b2 = decodingTable[data[data.length - 3]];

            bytes[bytes.length - 1] = (byte) ((b1 << 2) | (b2 >> 4));
        } else if (data[data.length - 1] == '=') {
            b1 = decodingTable[data[data.length - 4]];
            b2 = decodingTable[data[data.length - 3]];
            b3 = decodingTable[data[data.length - 2]];

            bytes[bytes.length - 2] = (byte) ((b1 << 2) | (b2 >> 4));
            bytes[bytes.length - 1] = (byte) ((b2 << 4) | (b3 >> 2));
        } else {
            b1 = decodingTable[data[data.length - 4]];
            b2 = decodingTable[data[data.length - 3]];
            b3 = decodingTable[data[data.length - 2]];
            b4 = decodingTable[data[data.length - 1]];

            bytes[bytes.length - 3] = (byte) ((b1 << 2) | (b2 >> 4));
            bytes[bytes.length - 2] = (byte) ((b2 << 4) | (b3 >> 2));
            bytes[bytes.length - 1] = (byte) ((b3 << 6) | b4);
        }

        return bytes;
    }

    public static byte[] decode(String data) {
        byte[] bytes;
        byte b1;
        byte b2;
        byte b3;
        byte b4;

        data = discardNonBase64Chars(data);

        if (data.charAt(data.length() - 2) == '=') {
            bytes = new byte[(((data.length() / 4) - 1) * 3) + 1];
        } else if (data.charAt(data.length() - 1) == '=') {
            bytes = new byte[(((data.length() / 4) - 1) * 3) + 2];
        } else {
            bytes = new byte[((data.length() / 4) * 3)];
        }

        for (int i = 0, j = 0; i < (data.length() - 4); i += 4, j += 3) {
            b1 = decodingTable[data.charAt(i)];
            b2 = decodingTable[data.charAt(i + 1)];
            b3 = decodingTable[data.charAt(i + 2)];
            b4 = decodingTable[data.charAt(i + 3)];

            bytes[j] = (byte) ((b1 << 2) | (b2 >> 4));
            bytes[j + 1] = (byte) ((b2 << 4) | (b3 >> 2));
            bytes[j + 2] = (byte) ((b3 << 6) | b4);
        }

        if (data.charAt(data.length() - 2) == '=') {
            b1 = decodingTable[data.charAt(data.length() - 4)];
            b2 = decodingTable[data.charAt(data.length() - 3)];

            bytes[bytes.length - 1] = (byte) ((b1 << 2) | (b2 >> 4));
        } else if (data.charAt(data.length() - 1) == '=') {
            b1 = decodingTable[data.charAt(data.length() - 4)];
            b2 = decodingTable[data.charAt(data.length() - 3)];
            b3 = decodingTable[data.charAt(data.length() - 2)];

            bytes[bytes.length - 2] = (byte) ((b1 << 2) | (b2 >> 4));
            bytes[bytes.length - 1] = (byte) ((b2 << 4) | (b3 >> 2));
        } else {
            b1 = decodingTable[data.charAt(data.length() - 4)];
            b2 = decodingTable[data.charAt(data.length() - 3)];
            b3 = decodingTable[data.charAt(data.length() - 2)];
            b4 = decodingTable[data.charAt(data.length() - 1)];

            bytes[bytes.length - 3] = (byte) ((b1 << 2) | (b2 >> 4));
            bytes[bytes.length - 2] = (byte) ((b2 << 4) | (b3 >> 2));
            bytes[bytes.length - 1] = (byte) ((b3 << 6) | b4);
        }

        return bytes;
    }

    public static String decodeToString(String s)
    {
        if (s == null)
        {
            return null;
        }
        BASE64Decoder decoder = new BASE64Decoder();
        try
        {
            byte[] b = decoder.decodeBuffer(s);
            return new String(b);
        } 
        catch (Exception e)
        {
            return null;
        }
    }
    
    private static byte[] discardNonBase64Bytes(byte[] data) {
        byte[] temp = new byte[data.length];
        int bytesCopied = 0;

        for (int i = 0; i < data.length; i++) {
            if (isValidBase64Byte(data[i])) {
                temp[bytesCopied++] = data[i];
            }
        }

        byte[] newData = new byte[bytesCopied];

        System.arraycopy(temp, 0, newData, 0, bytesCopied);

        return newData;
    }

    private static String discardNonBase64Chars(String data) {
        StringBuffer sb = new StringBuffer();

        int length = data.length();

        for (int i = 0; i < length; i++) {
            if (isValidBase64Byte((byte) (data.charAt(i)))) {
                sb.append(data.charAt(i));
            }
        }

        return sb.toString();
    }

    private static boolean isValidBase64Byte(byte b) {
        if (b == '=') {
            return true;
        } else if ((b < 0) || (b >= 128)) {
            return false;
        } else if (decodingTable[b] == -1) {
            return false;
        }

        return true;
    }
}

