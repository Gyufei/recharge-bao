'use client';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRechargeStations } from '@/lib/hooks/api/use-recharge-stations';
import { rechargeSchema } from '@/lib/types/data-model';
import { MdOutlineAdd } from "react-icons/md";

type RechargeFormData = z.infer<typeof rechargeSchema>;

export function AddRechargeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: stations } = useRechargeStations();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RechargeFormData>({
    resolver: zodResolver(rechargeSchema),
    defaultValues: {
      date: dayjs().format('YYYY-MM-DD'),
      chargingCost: 0,
      chargingKWh: 0,
      rangeBeforeCharging: null,
      rangeAfterCharging: null,
      socBeforeCharging: null,
      socAfterCharging: null,
      totalMileage: null,
      chargingStationId: 1,
    },
  });

  const onSubmit = async (data: RechargeFormData) => {
    try {
      await fetch('/api/recharge-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // 刷新数据
      await queryClient.invalidateQueries({ queryKey: ['chargeRecords'] });

      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('添加失败:', error);
    }
  };

  return (
    <>
      <button className="btn btn-outline btn-info" onClick={() => setIsOpen(true)}>
        <MdOutlineAdd className='text-2xl' />
      </button>

      <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-6">新增充电记录</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text text-base">日期</span>
                </label>
                <input type="date" className="input input-bordered" {...register('date')} />
                {errors.date && <span className="text-error text-sm mt-1">{errors.date.message}</span>}
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text text-base">充电站</span>
                </label>
                <select className="select select-bordered" {...register('chargingStationId', { valueAsNumber: true })}>
                  {stations?.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
                {errors.chargingStationId && <span className="text-error text-sm mt-1">{errors.chargingStationId.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text text-base">充电费用</span>
                </label>
                <input type="number" step="0.01" className="input input-bordered" {...register('chargingCost', { valueAsNumber: true })} />
                {errors.chargingCost && <span className="text-error text-sm mt-1">{errors.chargingCost.message}</span>}
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text text-base">充电度数</span>
                </label>
                <input type="number" step="0.001" className="input input-bordered" {...register('chargingKWh', { valueAsNumber: true })} />
                {errors.chargingKWh && <span className="text-error text-sm mt-1">{errors.chargingKWh.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text text-base">充电前续航</span>
                </label>
                <input type="number" className="input input-bordered" {...register('rangeBeforeCharging', { valueAsNumber: true })} />
                {errors.rangeBeforeCharging && <span className="text-error text-sm mt-1">{errors.rangeBeforeCharging.message}</span>}
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text text-base">充电后续航</span>
                </label>
                <input type="number" className="input input-bordered" {...register('rangeAfterCharging', { valueAsNumber: true })} />
                {errors.rangeAfterCharging && <span className="text-error text-sm mt-1">{errors.rangeAfterCharging.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text text-base">充电前电量</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="input input-bordered"
                  {...register('socBeforeCharging', { valueAsNumber: true })}
                />
                {errors.socBeforeCharging && <span className="text-error text-sm mt-1">{errors.socBeforeCharging.message}</span>}
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text text-base">充电后电量</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="input input-bordered"
                  {...register('socAfterCharging', { valueAsNumber: true })}
                />
                {errors.socAfterCharging && <span className="text-error text-sm mt-1">{errors.socAfterCharging.message}</span>}
              </div>
            </div>

            <div className="form-control flex flex-col">
              <label className="label mb-2">
                <span className="label-text text-base">总里程</span>
              </label>
              <input type="number" className="input input-bordered" {...register('totalMileage', { valueAsNumber: true })} />
              {errors.totalMileage && <span className="text-error text-sm mt-1">{errors.totalMileage.message}</span>}
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setIsOpen(false)}>
                取消
              </button>
              <button type="submit" className="btn btn-outline btn-info">
                确定
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
