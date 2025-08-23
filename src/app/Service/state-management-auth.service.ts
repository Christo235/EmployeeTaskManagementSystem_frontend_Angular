import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateManagementAuthService {


  private readonly TOKEN_KEY = 'token';
  private readonly ROLE_KEY = 'role';
  private readonly NAME_KEY = 'name';
  private readonly EMPLOYEE_ID_KEY = 'employeeID';


  private _token = signal<string | null>(null);
  private _role = signal<string | null>(null);
  private _name = signal<string | null>(null);
  private _employeeID = signal<number | null>(null);


  token = computed(() => this._token());
  role = computed(() => this._role());
  name = computed(() => this._name());
  employeeID = computed(() => this._employeeID());
  isLoggedIn = computed(() => !!this._token());

  constructor() {

    if (typeof window !== 'undefined' && sessionStorage) {
      this._token.set(sessionStorage.getItem(this.TOKEN_KEY));
      this._role.set(sessionStorage.getItem(this.ROLE_KEY));
      this._name.set(sessionStorage.getItem(this.NAME_KEY));

      const savedId = sessionStorage.getItem(this.EMPLOYEE_ID_KEY);
      this._employeeID.set(savedId ? Number(savedId) : null);
    }


    effect(() => {
      if (typeof window === 'undefined' || !sessionStorage) return;

      const token = this._token();
      const role = this._role();
      const name = this._name();
      const employeeID = this._employeeID();

      token ? sessionStorage.setItem(this.TOKEN_KEY, token) : sessionStorage.removeItem(this.TOKEN_KEY);
      role ? sessionStorage.setItem(this.ROLE_KEY, role) : sessionStorage.removeItem(this.ROLE_KEY);
      name ? sessionStorage.setItem(this.NAME_KEY, name) : sessionStorage.removeItem(this.NAME_KEY);
      employeeID !== null
        ? sessionStorage.setItem(this.EMPLOYEE_ID_KEY, employeeID.toString())
        : sessionStorage.removeItem(this.EMPLOYEE_ID_KEY);
    });
  }


  setAuth(token: string, role: string, name: string, employeeID: number) {
    this._token.set(token);
    this._role.set(role);
    this._name.set(name);
    this._employeeID.set(employeeID);
  }


  clearAuth() {
    this._token.set(null);
    this._role.set(null);
    this._name.set(null);
    this._employeeID.set(null);
  }


  logout() {
    this.clearAuth();
  }
}
