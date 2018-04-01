const sinon = require('sinon');
const expect = require('chai').expect;

const AmaraRedux = require('../dist/amara-plugin-redux');

describe('AmaraReduxPlugin', function() {

    let dispatch, store;

    beforeEach(function setup() {
        dispatch = sinon.spy();
        store = {
            getState: sinon.stub(),
            dispatch: sinon.spy(),
            subscribe: sinon.spy()
        };
    });

    it('returns handler factory', function() {
        expect(AmaraRedux).to.be.a('function');
    });

    it('handler factory returns handler', function() {
        expect(AmaraRedux(store)).to.be.a('function');
    });

    describe('handler', function() {

        beforeEach(function setup() {
            this.handler = AmaraRedux(store)(dispatch);
        });

        it('passes argument to store dispatch', function() {
            const action = {type: 'test'};
            expect(store.dispatch.called).false;
            this.handler(action);
            expect(store.dispatch.called).true;
            expect(store.dispatch.args[0][0]).eql(action);
        });

        it('adds __Amara__ property to action', function() {
            const action = {type: 'test'};
            expect(action.__Amara__).to.be.undefined;
            this.handler(action);
            expect(action.__Amara__).to.be.true;
        });

        it('invokes register on bootstrap', function() {
            const register = sinon.spy();
            this.handler({
                type: 'core:bootstrap',
                payload: { register }
            });
            expect(register.args[0][0]).to.equal('state');
            expect(register.args[0][1]).to.be.a('function');
        });

        it('stateArg provider returns current store state', function() {
            const register = sinon.spy();
            this.handler({
                type: 'core:bootstrap',
                payload: { register }
            });
            register.args[0][1]();
            expect(store.getState).called;
        });

        it('dispatches change-occurred when state changes', function() {
            store.getState.onFirstCall().returns({});
            store.getState.onSecondCall().returns({key: 'value'});
            store.subscribe.args[0][0]();
            expect(dispatch.called).true;
            expect(dispatch.args[0][0]).eql({
                type: 'core:change-occurred',
                payload: 'state',
                meta: {}
            });
        });

    });

});
