import { Injectable, EventEmitter } from '@angular/core'
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { AccountLoginMockService } from './account-login.service.mock';
import { AccountLoginApiService } from './account-login.service.api';
import { AccountLogin } from './account-login';
import { CacheCustomService } from 'app/services/cache/cache-custom.service';
import { UserDetail } from './account-login.model';
import { InstanceService } from 'app/services/instance.service';
import { JwtService, GlobalState } from 'app/services';

export interface IAccountLoginService {
    singinUser(userDetails: AccountLogin): Observable<UserDetail>,
    logout(): void,
    isAuthorized(): boolean,
};

@Injectable()
export class AccountLoginService implements IAccountLoginService {

    loginService: IAccountLoginService;
    cacheService: CacheCustomService;
    loginStatusEmitter: EventEmitter<UserDetail> = new EventEmitter<UserDetail>();


    /**
     * Constructor
     * @param  {InstanceService} privateinstanceService
     */
    constructor(private instanceService: InstanceService, private jwtService: JwtService, private globalState: GlobalState) {
        this.loginService = this.instanceService.getInstance((environment.needMock) ?
            AccountLoginMockService : AccountLoginApiService);
        this.cacheService = this.instanceService.getInstance(CacheCustomService);
    };

    /**
     * Calls signin function of concerned service
     * @param  {} userDetails
     * @returns Observable
     */
    singinUser(userDetails: AccountLogin): Observable<UserDetail> {
        return this.loginService.singinUser(userDetails).map((data) => {
            const token = Math.floor(100000 + Math.random() * 900000).toString();

            if (environment.needMock) {
                this.jwtService.saveToken(token);
            }
            this.globalState.notifyDataChanged('customerDetails', data);
            this.storeUserDetail(data);
            return data;
        });
    };

    /**
     * Calls logout function of concerned service
     * @returns void
     */
    logout(): void {
        this.cacheService.deleteCacheKey('userDetail');
        this.globalState.notifyDataChanged('customerDetails', null);
        this.jwtService.destroyToken();
    };

    /**
     * calls isAuthorized function of concerned service
     * @returns boolean
     */
    isAuthorized(): boolean {
        return !!this.jwtService.getToken();
    };

    /**
     * Stores user details in cache and emits to login status component
     * @param  {UserDetail} userDetail
     */
    private storeUserDetail(userDetail: UserDetail) {
        if (userDetail && typeof userDetail !== 'string') {
            this.cacheService.storeDataToCache(userDetail, 'userDetail', false)
            this.loginStatusEmitter.emit(userDetail);
        }
    }

};