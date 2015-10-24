package com.ctbri.config.api;

public class ConfigException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ConfigException() {
    }

    public ConfigException(Throwable cause) {
        super(cause);
    }

    public ConfigException(String message, Throwable cause) {
        super(message, cause);
    }

    public ConfigException(String message) {
        super(message);
    }

}
