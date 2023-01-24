export enum LocalStorageKeys {
  SHOW_ADVANCE_OPTIONS = "SETTINGS_SHOW_ADVANCE_OPTIONS",
}

class LocalStorage {
  set(id: LocalStorageKeys, data: any) {
    localStorage.setItem(id, JSON.stringify(data));
  }

  get(id: LocalStorageKeys): any {
    const value = localStorage.getItem(id);
    if (value) {
      return JSON.parse(value);
    }

    return value;
  }

  remove(id: LocalStorageKeys) {
    return localStorage.removeItem(id);
  }
}

export default new LocalStorage();
