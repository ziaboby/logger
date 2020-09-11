import packageJson from "./package.json";

type ArrayString = Array<string>;

enum loggerType {
  LOG,
  DEBUG,
  WARN,
  ERROR,
}

class Logger {
  private _activeLogTypes: ArrayString;
  public readonly availableLoggerTypes: ArrayString;
  public readonly __version: string;
  constructor(activeLogTypes?: ArrayString) {
    this.__version = packageJson.version;
    this.availableLoggerTypes = Object.keys(loggerType).filter((item) =>
      isNaN(parseInt(item))
    );
    this._activeLogTypes = activeLogTypes ? activeLogTypes.slice(0) : [];
  }

  get version(): string {
    return this.__version;
  }

  public isLogTypeEnabled(logType: string): boolean {
    return this._activeLogTypes.includes(logType);
  }

  set enableLogTypes(activeLogTypes: ArrayString) {
    this._activeLogTypes = activeLogTypes.slice(0);
  }

  set enableLogType(logType: string) {
    if (this.isLogTypeEnabled(logType)) {
      this._activeLogTypes.push(logType);
    }
  }

  set disableLogType(logType: string) {
    if (this.isLogTypeEnabled(logType)) {
      this._activeLogTypes.filter((item) => item !== logType);
    }
  }

  public resetLogTypes(): void {
    this._activeLogTypes = [];
  }

  private _console(type: string, key: string | undefined, args: any): void {
    if (!this.isLogTypeEnabled(type.toUpperCase())) return;
    key && args.unshift("[" + key + "]");
    // @ts-ignore
    console[type](...args);
  }

  log(message: Array<any>, key?: string): void {
    this._console("log", key, message);
  }

  debug(message: Array<any>, key?: string): void {
    this._console("debug", key, message);
  }

  warn(message: Array<any>, key?: string): void {
    this._console("warn", key, message);
  }

  error(message: Array<any>, key?: string): void {
    this._console("error", key, message);
  }
}

export default Logger;
